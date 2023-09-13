using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }


        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            //Getting the basket
            var basket = await RetrieveBasket(GetBuyerId());
            //If we dont have a basket we return not found
            if (basket == null) return NotFound();

            //Mapping basket and basket items to the dto from the method MapBasketToDto
            return basket.MapBasketToDto();
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket(GetBuyerId());

            //if we dont have a basket we create a new basket
            if (basket == null) basket = CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);
            //if we dont have the product with the mentioned id we return not found and exit the method 
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

            // add product from the method in Basket entity
            basket.AddItem(product, quantity);

            // save changes in db 
            var result = await _context.SaveChangesAsync() > 0;

            //if there is a change we return status code ok
            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            //if there was no changes to the database we return a bad request
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket(GetBuyerId());
            //if the basket is null return not found
            if (basket == null) return NotFound();
            //remove item or reduce quantity, method is called from Basket entity 
            basket.RemoveItem(productId, quantity);

            //save changes to the db 
            var result = await _context.SaveChangesAsync() > 0;
            //if we have made changes return status code ok 
            if (result) return Ok();
            //if we didnt make any changes return a bad request
            return BadRequest(new ProblemDetails { Title = "Problem removing the item from basket" });
        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {

            //buyer id for logged in user
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                //generate random buyer id for not logged in user

                buyerId = Guid.NewGuid().ToString();
                //cookie option essential is set to true because the website isnt gonna work without this cookie and it expires after 30 days
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                //add the guid buyerid as a cookie  
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            //create new basket 
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}