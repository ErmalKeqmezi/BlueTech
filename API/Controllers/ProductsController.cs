using System.Text.Json;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }

        
        [HttpGet("GetAllProducts")]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                 .Sort(productParams.OrderBy)
                 .Search(productParams.SearchTerm)
                 .Filter(productParams.Brands, productParams.Types)
                 .AsQueryable();



            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            brands.RemoveAll(brand => brand == null);
            types.RemoveAll(type => type == null);


            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("CreateProductBrand")]
        public async Task<ActionResult> CreateProductBrand(string brand)
        {
            bool brandExists = await _context.Products.AnyAsync(p => p.Brand == brand);

            if (brandExists)
            {
                return Conflict(new ProblemDetails { Title = "Brand already exists" });
            }

            var newProduct = new Product
            {
                Brand = brand
            };

            _context.Products.Add(newProduct);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtAction(nameof(CreateProductBrand), new { brand });
            }

            return BadRequest(new ProblemDetails { Title = "Problem creating brand" });
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("GetBrands")]
        public async Task<IActionResult> GetAllProductBrands()
        {
            var productBrands = await _context.Products
                .Select(p => p.Brand)
                .Distinct()
                .ToListAsync();

            return Ok(productBrands);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteProductBrand")]
        public async Task<ActionResult> DeleteProductBrand(string brand)
        {
            var productsToDelete = await _context.Products.Where(p => p.Brand == brand).ToListAsync();

            if (productsToDelete == null || productsToDelete.Count == 0)
            {
                return NotFound(new ProblemDetails { Title = "Brand not found" });
            }

            _context.Products.RemoveRange(productsToDelete);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok(new { Message = "Brand deleted successfully" });
            }

            return BadRequest(new ProblemDetails { Title = "Problem deleting brand" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateProductBrand")]
        public async Task<ActionResult> UpdateProductBrand(string oldBrand, string newBrand)
        {
            var productsToUpdate = await _context.Products.Where(p => p.Brand == oldBrand).ToListAsync();

            if (productsToUpdate == null || productsToUpdate.Count == 0)
            {
                return NotFound(new ProblemDetails { Title = "Brand not found" });
            }

            foreach (var product in productsToUpdate)
            {
                product.Brand = newBrand;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok(new { Message = "Brand updated successfully" });
            }

            return BadRequest(new ProblemDetails { Title = "Problem updating brand" });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("CreateProductType")]
        public async Task<ActionResult> CreateProductType(string type)
        {
            bool typeExists = await _context.Products.AnyAsync(p => p.Type == type);

            if (typeExists)
            {
                return Conflict(new ProblemDetails { Title = "Product type already exists" });
            }

            var newProduct = new Product
            {
                Type = type
            };

            _context.Products.Add(newProduct);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtAction(nameof(CreateProductType), new { type });
            }

            return BadRequest(new ProblemDetails { Title = "Problem creating product type" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateProductType")]
        public async Task<ActionResult> UpdateProductType(string oldType, string newType)
        {

            var productsToUpdate = await _context.Products.Where(p => p.Type == oldType).ToListAsync();

            if (productsToUpdate == null || productsToUpdate.Count == 0)
            {
                return NotFound(new ProblemDetails { Title = "Product type not found" });
            }

            foreach (var product in productsToUpdate)
            {
                product.Type = newType;
            }
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {

                return Ok(new { Message = "Product type updated successfully" });
            }

            return BadRequest(new ProblemDetails { Title = "Problem updating product type" });
        }
        
        [Authorize(Roles = "Admin")]
        [HttpGet("DeleteProductType")]
        public async Task<ActionResult> DeleteProductType(string type)
        {
            var productsToDelete = await _context.Products.Where(p => p.Type == type).ToListAsync();

            if (productsToDelete == null || productsToDelete.Count == 0)
            {
                return NotFound(new ProblemDetails { Title = "Product type not found" });
            }

            _context.Products.RemoveRange(productsToDelete);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok(new { Message = "Product type deleted successfully" });
            }

            return BadRequest(new ProblemDetails { Title = "Problem deleting product type" });
        }

        [HttpGet(Name = "GetProductTypes")]
        public async Task<IActionResult> GetAllProductTypes()
        {
            var productTypes = await _context.Products
                .Select(p => p.Type)
                .Distinct()
                .ToListAsync();

            return Ok(productTypes);
        }



        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                product.PictureUrl = imageResult.Url.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId)) await _imageService.DeleteImageAsync(product.PublicId);

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);

            if (product == null) return NotFound();

            _mapper.Map(productDto, product);

            if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if (!string.IsNullOrEmpty(product.PublicId)) await _imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.Url.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem editing product" });
        }
    }
}