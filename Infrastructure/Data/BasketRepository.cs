using Core.Interfaces;
using Core.Models;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer _multiplexer)
        {
            _database = _multiplexer.GetDatabase();
        }
        public async Task<bool> DeleteCustomerBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetCustomerbasketAsync(string basketId)
        {
            var basketDetails = await _database.StringGetAsync(basketId);

            if(basketDetails.IsNullOrEmpty)
            {
                return null;
            }
            return JsonSerializer.Deserialize<CustomerBasket>(basketDetails);
        }

        public async Task<CustomerBasket> UpdateCustomerBasketAsync(CustomerBasket customerBasket)
        {
            var basketDetails = await _database.StringSetAsync(customerBasket.Id,
                                                               JsonSerializer.Serialize(customerBasket),
                                                               TimeSpan.FromDays(30));

            if(!basketDetails)
            {
                return null;
            }

            return await GetCustomerbasketAsync(customerBasket.Id);
            
        }
    }
}
