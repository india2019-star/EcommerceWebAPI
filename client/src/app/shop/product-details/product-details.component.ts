import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/products';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(private service: ShopService, private activaetdRoute:ActivatedRoute,private breadcrumbservice:BreadcrumbService) {
    this.breadcrumbservice.set('@productDetails',' ');
   }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails()
  {
    this.service.getProductById(+this.activaetdRoute.snapshot.paramMap.get('id')).subscribe(response =>{
      this.product = response;
      this.breadcrumbservice.set('@productDetails',response.name);
    },error =>{
      console.log(error)
    });
  }

}
