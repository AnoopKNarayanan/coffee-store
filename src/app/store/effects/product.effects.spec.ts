import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProductEffects } from './product.effects';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState, ProductState } from '../reducer/product.reducer';
import { ProductService } from 'src/app/services/product.service';
import { TestScheduler } from 'rxjs/testing';
import { Product } from 'src/app/models/product';
import { PRODUCTS } from 'src/app/resources/products';
import { loadProducts, loadProductsSuccess } from '../action/product.actions';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let store: MockStore<ProductState>;
  let testScheduler: TestScheduler;

  const productService = jasmine.createSpyObj('productService', [
    'getAllProducts'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockStore({initialState}),
        provideMockActions(() => actions$),
        { provide: ProductService, useValue: productService }
      ]
    });

    effects = TestBed.inject(ProductEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load products and return loadProductsSuccess action', () => {
    const products : Product[] = [];
    const action = loadProducts({ url: 'https://random-data-api.com/api/coffee/random_coffee?size=50' });
    const outcome = loadProductsSuccess({ products });

    testScheduler.run(({hot, cold, expectObservable}) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: products });
      productService.getAllProducts.and.returnValue(response);

      expectObservable(effects.loadProducts$).toBe('--b', { b: outcome });
    });
  });
});
