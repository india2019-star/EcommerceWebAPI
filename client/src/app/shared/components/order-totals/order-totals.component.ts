import { BasketService } from './../../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { IBasketTotals } from '../../models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {

  basketTotals$ : Observable<IBasketTotals>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotals$;
  }

}
