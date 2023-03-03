import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Product } from '../models/product';
import { PRODUCTS } from '../resources/products';
import { initialState, ProductState } from '../store/reducer/product.reducer';
import { selectPaginatedProducts } from '../store/selector/product.selectors';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore<ProductState>;
  const products : Product[] = Object.values(PRODUCTS);
  const productState: ProductState = {products: products};
  let mockShowsSelector: MemoizedSelector<any, any, DefaultProjectorFn<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [provideMockStore({initialState})]
    })
    .compileComponents();


    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductListComponent);
    mockShowsSelector = store.overrideSelector(selectPaginatedProducts(0, 4), products);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get paginated Products', () => {
    expect(fixture.debugElement.queryAll(By.css('.card')).length).toBe(0);
  });
});
