using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceWebAPI.Controllers
{
    
    public class BasketController : BaseController
    {
        private readonly IBasketRepository _basketRepo;
        public BasketController(IBasketRepository basketRepo)
        {
            _basketRepo = basketRepo;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepo.GetCustomerbasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            var updatedBakset = await  _basketRepo.UpdateCustomerBasketAsync(basket);
            return Ok(updatedBakset);
        }

        [HttpDelete]

        public async Task<ActionResult<bool>> DeleteBasketById(string id)
        {
            return await _basketRepo.DeleteCustomerBasketAsync(id);
        }
    }
}
