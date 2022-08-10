import { BasketService } from './../../basket/basket.service';
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
  quantity: number = 1;
  constructor(private service: ShopService, 
              private activatedRoute:ActivatedRoute,
              private breadcrumbservice:BreadcrumbService,
              private basketService: BasketService) {
    this.breadcrumbservice.set('@productDetails',' ');
   }

  ngOnInit(): void {
    this.getProductDetails();
  }

  addItemToBasket()
  {
    this.basketService.addItemTobasket(this.product,this.quantity);
  }
  incrementItemQuantity()
  {
    this.quantity++;
  }

  decrementItemQuantity()
  {
    if(this.quantity > 1)
    {
      this.quantity--;
    }

  }


  getProductDetails()
  {
    this.service.getProductById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(response =>{
      this.product = response;
      this.breadcrumbservice.set('@productDetails',response.name);
    },error =>{
      console.log(error)
    });
  }

}
