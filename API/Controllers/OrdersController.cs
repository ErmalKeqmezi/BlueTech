using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
        }   

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(x=> x.BuyerId == User.Identity.Name)
            .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(o => o.BuyerId == User.Identity.Name && o.Id == id)
            .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            //Get basket
            var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

            //Check if user has basket
            if(basket == null) return BadRequest(new ProblemDetails{Title = "Could't locate basket"});

            //Build list of order items
            var items = new List<OrderItem>();

            //Create the order items
            foreach(var item in basket.Items)
            {
                //get the porduct item
                var productItem = await _context.Products.FindAsync(item.ProductId);

                //create an ordered item
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };

                //create the order item
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };

                //add to list of items
                items.Add(orderItem);
                //reduce the quantity in stock
                productItem.QuantityInStock -= item.Quantity;
            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 10000 ? 0 : 500;

            //Create the order
            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee
            };
            
            //Add the order
            _context.Orders.Add(order);
            //Remove the basket after sending the order 
            _context.Baskets.Remove(basket);

            //Check if the user wanted to save his address
            if(orderDto.SaveAddress)
            {
                //Get the user 
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                //Map the address
                user.Address = new UserAddress 
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    Country = orderDto.ShippingAddress.Country,
                    Zip = orderDto.ShippingAddress.Zip,
                };
                _context.Update(user);
            }
            //Save changes to database
            var result = await _context.SaveChangesAsync() > 0;

            //Check if there was changes 
            if(result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);
            //If there is no changes in the database return a badrequest
            return BadRequest("Problem with creating your order");
        }
    }
}