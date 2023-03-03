import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product';

import * as ProductReducer from '../reducer/product.reducer';

export const selectProductState = createFeatureSelector<ProductReducer.ProductState>(
    ProductReducer.productFeatureKey
);

/**
 * Selector to select Product from Store based on Id
 * @param id Unique Id of the product
 * @returns Product details
 */
export const selectProductById = (id: number) => createSelector(
    selectProductState,
    (state: any) => {
        return state.products.find((product: Product) => product.id == id);
    }
);

/**
 * Selector to select list of Products from store between a range
 * @param start Starting index
 * @param end Ending index
 * @returns List of Products
 */
export const selectPaginatedProducts = (start: number, end: number) => createSelector(
    selectProductState,
    (state: any) => {
        return state.products.filter((product: Product, index: number) => index >= start && index <= end );
      }
);

