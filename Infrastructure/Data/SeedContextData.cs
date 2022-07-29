using Core.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SeedContextData
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                //product brands seed data
                if(!context.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach(var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }
                    await context.SaveChangesAsync();
                }


                //product types seed data
                if (!context.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText("C:\\Users\\Raj\\source\\repos\\ECommerceWebAPI\\Infrastructure\\Data\\SeedData\\types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }
                    await context.SaveChangesAsync();
                }


                //products  seed data
                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText("C:\\Users\\Raj\\source\\repos\\ECommerceWebAPI\\Infrastructure\\Data\\SeedData\\products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }
                    await context.SaveChangesAsync();
                }



            }
            catch(Exception e)
            {
                var logger = loggerFactory.CreateLogger<SeedContextData>();
                logger.LogError(e,"An Error Occurred while seeding data");
            }

        }
    }
}
