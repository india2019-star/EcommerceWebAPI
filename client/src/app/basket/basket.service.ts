import { IProduct } from './../shared/models/products';
import { Basket, IBasket, IBasketItem, IBasketTotals } from './../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReadKeyExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotals = new BehaviorSubject<IBasketTotals>(null);
  basketTotals$ = this.basketTotals.asObservable();
  constructor(private http:HttpClient) { }

  getBasket(id:string)
  {
    return this.http.get(this.baseUrl + `basket?id=` + id)
    .pipe(
      map((basketResponse:IBasket)=>{
        this.basketSource.next(basketResponse);
        console.log(this.getCurrentBasket());
        this.calculateTotals();
      })
    );
  }

  setBasket(basket : IBasket)
  {
      return this.http.post(this.baseUrl + 'basket/',basket).subscribe(
        (response:IBasket) =>{
          this.basketSource.next(response);
          this.calculateTotals();
        },error =>{
          console.log(error);
        });
  }

  getCurrentBasket()
  {
    return this.basketSource.value;
  }
 
  incrementItemQuantity(item: IBasketItem)
  {
    const basket = this.getCurrentBasket();
    var getItemIndex = -1;
    var flag = 0;
    for(var i = 0 ; i < basket.basketItems.length;i++)
    {
      if(basket.basketItems[i].id === item.id)
      {
        flag = 1;
        getItemIndex = i;
        break;
      }
    }

    basket.basketItems[getItemIndex].quantity++;
    this.setBasket(basket);
  }


  decrementItemQuantity(item: IBasketItem)
  {
    const basket = this.getCurrentBasket();
    var getItemIndex = -1;
    var flag = 0;
    for(var i = 0 ; i < basket.basketItems.length;i++)
    {
      if(basket.basketItems[i].id === item.id)
      {
        flag = 1;
        getItemIndex = i;
        break;
      }
    }
    
    if(basket.basketItems[getItemIndex].quantity > 1)
    {
      basket.basketItems[getItemIndex].quantity--;
      this.setBasket(basket);
    }
    else
    {
      this.removeItemFromBasket(item);
    }
    
    
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasket();
    if(basket.basketItems.some(x=>x.id === item.id)){
      basket.basketItems = basket.basketItems.filter(i=>i.id !== item.id);

      if(basket.basketItems.length > 0)
      {
        this.setBasket(basket);
      }
      else 
      {
        this.deleteBasket(basket);
      }
    }
   
    
    
  }

  deleteBasket(basket: IBasket)
  {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(()=>{
      this.basketSource.next(null);
      this.basketTotals.next(null);
      localStorage.removeItem('basket_id');

    },error=>{
      console.log(error);
    });
  }

  addItemTobasket(item:IProduct,quantity = 1)
  {
    const itemToAdd : IBasketItem = this.mapProductToBasketItem(item,quantity);
    const basket = this.getCurrentBasket() ?? this.createBasket();
    basket.basketItems = this.addOrUpdateBasket(basket.basketItems,itemToAdd,quantity);
    this.setBasket(basket);
  }

  private calculateTotals()
  {
    const basket = this.getCurrentBasket();
    const shippingCharges = 0;
    var subtotal = 0;
    for(var i = 0 ; i < basket.basketItems.length;i++)
    {
      subtotal = subtotal + (basket.basketItems[i].quantity * basket.basketItems[i].price);
    }
    const total = shippingCharges + subtotal;

    this.basketTotals.next({shippingCharges,subtotal,total});


  }


  private addOrUpdateBasket(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    var flag = 0;
    for(var i  = 0 ; i < basketItems.length;i++)
    {
      if(basketItems[i].id === itemToAdd.id)
      {
        basketItems[i].quantity += quantity;
        flag = 1;
        break;
      }
    }
    if(flag == 0)
    {
      basketItems.push(itemToAdd);
    }
    return basketItems;
  }
  private createBasket(): IBasket {
    const newBasket =  new Basket();
    localStorage.setItem('basket_id',newBasket.id);
    return newBasket;
  }
  private mapProductToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      productBrand: item.productBrand,
      productType: item.productType
    };
  }
}


