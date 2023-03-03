import { Product } from 'src/app/models/product';
import { PRODUCTS } from 'src/app/resources/products';
import { loadProductDetails, loadProductsSuccess } from '../action/product.actions';
import { productReducer, initialState, ProductState } from './product.reducer';

describe('Product Reducer', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const state = productReducer(initialState, action);

      expect(state).toBe(initialState);
    });

  it('should load Products', () => {
    const products : Product[] = Object.values(PRODUCTS);
    const newState: ProductState = {products: products};
    const action = loadProductsSuccess({ products: products});

    const state = productReducer(initialState, action);
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should fetch Product Details', () => {
    const products : Product[] = Object.values(PRODUCTS);
    const initialState: ProductState = {products: products};
    const action =  loadProductDetails({ id: 1});

    const state = productReducer(initialState, action);
    expect(state.products[0].id).toEqual(1);
    expect(state.products[1].blend_name).toEqual('Thanksgiving Breaker');
  });
});
