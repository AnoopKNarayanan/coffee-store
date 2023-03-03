import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import * as ProductActions from '../store/action/product.actions';
import * as ProductSelector from '../store/selector/product.selectors';
import { filter } from 'rxjs';

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

  constructor(private store: Store, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
        if(params.page){
          this.currPage = Number(params.page);
        }          
      }
    );
    this.getPaginatedProducts();
    //this.store.dispatch(ProductActions.loadProducts({url: 'https://random-data-api.com/api/coffee/random_coffee?size=50'}));
  }

  /**
   * On click event that is triggered when the page is changed.
   * @param page current page number
   */
  changePage(page: number): void {
    this.currPage = page;
    this.getPaginatedProducts();
  }

  /**
   * Fetch a paginated list of products.
   */
  getPaginatedProducts() {
    var start = (this.currPage - 1) * this.size;
    var end = start + this.size - 1;
    this.paginatedProducts$ = this.store.pipe(select(ProductSelector.selectPaginatedProducts(start, end)));
  }

}
