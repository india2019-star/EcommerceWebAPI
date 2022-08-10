import {v4 as uuid} from 'uuid';
export interface IBasket {
    id: string;
    basketItems: IBasketItem[];
}

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    productBrand: string;
    productType: string;
}

export class Basket implements IBasket{
    id = uuid();
    basketItems: IBasketItem[] = [];
}

export interface IBasketTotals{
    shippingCharges : number;
    subtotal : number;
    total : number;
}