﻿using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
         Task AddProductsAsync(Product[] product);
         Task AddProductBrandsAsync(ProductBrand[] productBrand);
         Task AddProductTypesAsync (ProductType[] productType);
        Task<Product> GetProductByIdAsync(int id);

        Task<Pagination<Product>> GetProductsAsync(ProductParams productParams);
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
        
    }
}
