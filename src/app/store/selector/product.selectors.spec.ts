import { Product } from "src/app/models/product";
import { PRODUCTS } from "src/app/resources/products";
import { initialState, ProductState } from "../reducer/product.reducer";
import { selectPaginatedProducts, selectProductById } from "./product.selectors";


describe('Product Selectors', () => {
  it('should select Product by Id', () => {
    const products : Product[] = Object.values(PRODUCTS);
    const productState: ProductState = {products: products};
    const result = selectProductById(2).projector(productState);

    expect(result.blend_name).toEqual('Thanksgiving Breaker');     
  });

  it('should select paginated Products', () => {
    const products : Product[] = Object.values(PRODUCTS);
    const productState: ProductState = {products: products};
    const result = selectPaginatedProducts(0, 4).projector(productState);

    expect(result.length).toEqual(5);   
    expect(result[0].id).toEqual(1);     
  });
});
