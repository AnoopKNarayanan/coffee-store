import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import * as ProductActions from '../store/action/product.actions';
import * as ProductSelector from '../store/selector/product.selectors';

@Component({
  selector: 'app-product-details',  
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails$!: Observable<Product>;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router){

  }

  ngOnInit(): void {
    var productId = this.route.snapshot.params['id'];
    this.productDetails$ = this.store.pipe(select(ProductSelector.selectProductById(productId)));
    this.loadProducts(productId);
  }

  loadProducts(productId: number){
    this.store.dispatch(ProductActions.loadProductDetails({id: productId}));
  }

  goBack(): void {
    this.router.navigate(['/coffee-store']);
  }

}
