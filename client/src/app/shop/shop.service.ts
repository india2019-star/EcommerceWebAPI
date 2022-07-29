import { ShopParams } from './../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';

import { IPagination } from '../shared/models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams)
  {
    let params = new HttpParams();
    if(shopParams.brandId !== 0)
    {
      params = params.append('brandId',shopParams.brandId.toString());
    }

    if(shopParams.productTypeId !== 0)
    {
      params = params.append('productTypeId',shopParams.productTypeId.toString());
    }
    if(shopParams.Sort)
    {
      params = params.append('Sort',shopParams.Sort.toString());
    }
    params = params.append('pageIndex',shopParams.pageNumber.toString());
    params = params.append('pageSize',shopParams.pageSize.toString());
    if(shopParams.search)
    {
      params = params.append('search',shopParams.search.toString());
    }
    return this.http.get<IPagination>(this.baseUrl + "products",{observe:'response',params})
            .pipe(
              map(response=>{
                return response.body;
              })
            );
  }

  getBrands()
  {
    return this.http.get<IBrand[]>(this.baseUrl + "products/brands");
  }

  getProductTypes()
  {
    return this.http.get<IType[]>(this.baseUrl + "products/types");
  }
}
