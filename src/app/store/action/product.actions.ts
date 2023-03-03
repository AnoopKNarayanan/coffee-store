import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';

/**
 * Action to load all products. Expects API URL as a property.
 */
export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ url: string }>()
);

/**
 * Action when products are successfuly fetched.
 */
export const loadProductsSuccess = createAction(
  '[Product Effect] Load Products Success',
  props<{ products: Product[] }>()
);

/**
 * Action on error while fetching products.
 */
export const loadProductsFailure = createAction(
  '[Product Effect] Load Products Failure',
  props<{ error: string }>()
);

/**
 * Action to load a single product based on Id.
 */
export const loadProductDetails = createAction(
  '[Product Details] Load Product Details',
  props<{ id: number }>()
);