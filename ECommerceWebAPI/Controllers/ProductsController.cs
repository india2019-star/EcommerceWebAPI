using AutoMapper;
using Core;
using Core.Interfaces;
using Core.Models;
using ECommerceWebAPI.DTO;
using ECommerceWebAPI.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceWebAPI.Controllers
{

    //[Route("api/[controller]")]
    //[ApiController]
    public class ProductsController : BaseController
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("addProducts")]
        public  void AddProducts(Product[] products) 
        {
             _repo.AddProductsAsync(products);
        }

        [HttpPost("addProductBrands")]
        public void AddProductBrands(ProductBrand[] productBrands)
        {
            _repo.AddProductBrandsAsync(productBrands);
        }

        [HttpPost("addProductTypes")]
        public void AddProductTypes(ProductType[] productTypes)
        {
            _repo.AddProductTypesAsync(productTypes);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductDTO>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var products = await _repo.GetProductsAsync(productParams);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDTO>>(products.Data);
           // products.Data = data;
            return Ok(new Pagination<ProductDTO>(products.PageIndex,products.PageSize,products.Count,data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetSingleProduct(int id)
        {
            var prod = await _repo.GetProductByIdAsync(id);
            if(prod == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return _mapper.Map<Product, ProductDTO>(prod);
        }

        [HttpGet("brands")]

        public async Task<ActionResult<ProductBrand>> GetProductBrands()
        {
            var prodbrands = await _repo.GetProductBrandsAsync();
            return Ok(prodbrands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<ProductType>> GetProductTypes()
        {
            var prodtypes = await _repo.GetProductTypesAsync();
            return Ok(prodtypes);
        }


    }
}
