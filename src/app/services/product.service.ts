import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  /**
   * This function is used to make http call to API for fetching list of Products
   * @param url API URL
   */
  getAllProducts(url: string): Observable<Product[]> {
    return this.http.get<Product[]>(url);
  }
}
