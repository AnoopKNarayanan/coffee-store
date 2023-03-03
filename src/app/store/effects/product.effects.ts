import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, startWith } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import * as ProductActions from '../action/product.actions';


@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      startWith(ProductActions.loadProducts({url: 'https://random-data-api.com/api/coffee/random_coffee?size=50'})),
      mergeMap((action) => 
        this.productService.getAllProducts(action.url).pipe(
          map(data => ProductActions.loadProductsSuccess({ products: data })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    );
  });
}
