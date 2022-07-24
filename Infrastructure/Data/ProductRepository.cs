using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;


namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {

        private readonly StoreContext _context;
        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .SingleOrDefaultAsync(w => w.Id == id);
        }

        public async Task<Pagination<Product>> GetProductsAsync(ProductParams productParams)
        {

            int skip = productParams.PageSize * (productParams.PageIndex - 1);
            int take = productParams.PageSize;
           
            var  filteredProducts = _context.Products.Where(w => (string.IsNullOrEmpty(productParams.Search) || w.Name.Contains(productParams.Search))
                                                              && (!productParams.ProductTypeId.HasValue || w.ProductTypeId == productParams.ProductTypeId)
                                                              && (!productParams.BrandId.HasValue || w.ProductBrandId == productParams.BrandId));

            int count = filteredProducts.Count();
            if(count == 0)
            {
                return new Pagination<Product>(productParams.PageIndex, productParams.PageSize,
                                                count, null);
               // return null;
                //filteredProducts = _context.Products;
            }
            List<Product> result;
            
            switch(productParams.Sort)
            {
                case "priceAsc":
                    result =  await filteredProducts
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .OrderBy(w => w.Price)
                .ToListAsync();
                    break;
                case "priceDesc":
                    result =  await filteredProducts
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .OrderByDescending(w => w.Price)
                .ToListAsync();
                    break;

                case "Name":
                
                  result =  await filteredProducts
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .OrderBy(w => w.Name)
                .ToListAsync();
                    break;
                default:
                    result =  await filteredProducts
                        .Include(p => p.ProductBrand)
                        .Include(p => p.ProductType)
                        .ToListAsync();
                    break;

            }

            var data = result.Skip(skip).Take(take).ToList();
            return new Pagination<Product>(productParams.PageIndex, productParams.PageSize, count, data);



        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }
    }
}
