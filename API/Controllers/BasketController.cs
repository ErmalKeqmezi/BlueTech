using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
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


        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return basket;
        }



        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();

            //if we dont have a basket we create a new basket
            if (basket == null) basket = CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);
            //if we dont have the product with the mentioned id we return not found and exit the method 
            if (product == null) return NotFound();

            // add product 
            basket.AddItem(product, quantity);

            // save product in db 
            var result = await _context.SaveChangesAsync() > 0;

            //if there is a change we return status code ok
            if (result) return StatusCode(201);

            //if there was no changes to the database we return a problem 
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            //remove item or reduce quantity
            //save changes
            return Ok();
        }
        private async Task<Basket> RetrieveBasket()
        {

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            //generate random buyer id 
            var buyerId = Guid.NewGuid().ToString();
            //cookie option essential is set to true because the website isnt gonna work without this cookie and it expires after 30 days
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            //add the cookie with the buyerid 
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            //create new basket 
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}