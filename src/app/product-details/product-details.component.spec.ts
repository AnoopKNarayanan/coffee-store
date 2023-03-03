import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadProductDetails } from '../store/action/product.actions';
import { initialState, ProductState } from '../store/reducer/product.reducer';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let store: MockStore<ProductState>;
  let route;
  let router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      providers: [provideMockStore({initialState})],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.get(Router);
    route = TestBed.inject(ActivatedRoute)
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadProductDetails should dispatch', () => {
    component.loadProducts(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      loadProductDetails({ id: 1 })
    );
  });
});
