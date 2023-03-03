import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ProductService } from './product.service';
import { PRODUCTS } from '../resources/products';

describe('ProductService', () => {
  let service: ProductService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch data', () => {
    service.getAllProducts('https://random-data-api.com/api/coffee/random_coffee?size=5').subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.length).toBe(5);
    });
    const mockReq = testingController.expectOne('https://random-data-api.com/api/coffee/random_coffee?size=5');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(PRODUCTS));
  });
});
