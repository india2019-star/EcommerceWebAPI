import { ShopParams } from './../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { ShopService } from './shop.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/products';
import { IPagination } from '../shared/models/pagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:false}) searchTerm;
 products:IProduct[];
 productBrands:IBrand[];
 productTypes:IType[];
//  brandIdSelected = 0;
//  typeIdSelected = 0;
//  sortSelected = "name";
totalCount:number;
 sortOptions = [
  {name:'Alphabetical', value:'name'},
  {name:'Price : Low to High',value:"priceAsc"},
  {name:'Price : High to Low',value:"priceDesc"},
 ]

 shopParams = new ShopParams()

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
    this.getBrands();
  }

  getProducts()
  {
    this.shopService.getProducts(this.shopParams).subscribe((response)=>
    {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    },error =>{
      console.log(error);
    });
  }

  getBrands()
  {
    this.shopService.getBrands().subscribe((response)=>
    {
      this.productBrands = [{id:0,name:"All"},...response];
    },error =>{
      console.log(error);
    });
  }

  
  getProductTypes()
  {
    this.shopService.getProductTypes().subscribe((response)=>
    {
      this.productTypes = [{id:0,name:"All"},...response];
    },error =>{
      console.log(error);
    });

  }

  onBrandSelected(brandId:number)
  {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number)
  {
    this.shopParams.productTypeId= typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sortParameter: string)
  {
    this.shopParams.Sort = sortParameter;
    this.getProducts();
  }

  onPageChanged(event:any)
  {
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
    
  }

  onSearch()
  {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset()
  {
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.getProducts();
  }

}


