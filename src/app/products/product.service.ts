import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private productsUrl = 'api/products';
  private headers: HttpHeaders;
  private accessPointUrl = 'http://angbckndapi-dev.centralus.azurecontainer.io/api/store/all'
  private getByProductId = 'angbckndapi-dev.centralus.azurecontainer.io/api/store/ProductById'
  private updateProuct   =   'angbckndapi-dev.centralus.azurecontainer.io/api/store/UpdateProduct'
  private CreateProduct  = 'angbckndapi-dev.centralus.azurecontainer.io/api/store/CreateProduct'

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  getProducts(): Observable<Product[]> {
    console.log(this.accessPointUrl, this.headers)
    return this.http.get<Product[]>(this.accessPointUrl, {headers: this.headers})
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.getByProductId}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    product.price= 25;
    product.stockUpdatedOn = new Date("11/04/2015");
    return this.http.post<Product>(this.CreateProduct, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // deleteProduct(id: number): Observable<{}> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.productsUrl}/${id}`;
  //   return this.http.delete<Product>(url, { headers })
  //     .pipe(
  //       tap(data => console.log('deleteProduct: ' + id)),
  //       catchError(this.handleError)
  //     );
  // }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.updateProuct}/${product.id}`;
    return this.http.put<Product>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {      
      id: 0,
      productName: null,
      price: 0,    
      productQty: 0,
      stockUpdatedOn: null
     // starRating:0
    };
  }
}
