import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  /* This method is used to makehttp call to API for fetching list of Products */
  getAllProducts(url: string): Observable<Product[]> {
    return this.http.get<Product[]>(url);
  }
}
