import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import * as ProductActions from '../store/action/product.actions';
import * as ProductSelector from '../store/selector/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  paginatedProducts$!: Observable<Product[]>;
  size: number = 10;
  currPage = 1;

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.getPaginatedProducts();
    //this.store.dispatch(ProductActions.loadProducts({url: 'https://random-data-api.com/api/coffee/random_coffee?size=50'}));
  }

  changePage(page: number): void {
    this.currPage = page;
    this.getPaginatedProducts();
  }

  getPaginatedProducts() {
    var start = (this.currPage - 1) * this.size;
    var end = start + this.size - 1;
    this.paginatedProducts$ = this.store.pipe(select(ProductSelector.selectPaginatedProducts(start, end)));
  }

}
