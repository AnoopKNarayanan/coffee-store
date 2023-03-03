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
  page: number = 1;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router){

  }

  ngOnInit(): void {
    var productId = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params: any) => {
      if(params.page)
        this.page = Number(params.page);
    }
  );
    this.productDetails$ = this.store.pipe(select(ProductSelector.selectProductById(productId)));
    this.loadProducts(productId);
  }

  /**
   * Function to load details of a specific Product based on Id
   * @param productId Id of the product whose details are to be fetched 
   */
  loadProducts(productId: number){
    this.store.dispatch(ProductActions.loadProductDetails({id: productId}));
  }

  /**
   * Function to navigate back to the Product list page.
   */
  goBack(): void {
    this.router.navigate(['/coffee-store'], { queryParams: { page: this.page } });
  }

}
