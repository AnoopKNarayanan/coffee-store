import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
  let mockShowsSelector: MemoizedSelector<ProductState, Product[]>;
  let route;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [provideMockStore()],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ProductListComponent);
    mockShowsSelector = store.overrideSelector(selectPaginatedProducts(0, 4), products);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get paginated Products', () => {
    mockShowsSelector.setResult([{
      id: 1,
      uid: "ec15e9e0-40de-4d1a-a698-b4679eae7c55",
      blend_name: "The Been",
      origin: "Lintong, Sumatra",
      variety: "Mundo Novo",
      notes: "tart, slick, mint, leathery, orange creamsicle",
      intensifier: "faint"
    }]);
    store.refreshState();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.card-title'))[0].nativeElement.textContent).toBe('The Been');
  });
});
