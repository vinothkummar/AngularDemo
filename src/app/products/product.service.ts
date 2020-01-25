import { IProduct } from './products';
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private headers: HttpHeaders;
    private accessPointUrl = 'https://localhost:44321/api/store/All'

    constructor(private http: HttpClient){
        this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    }

    getProducts(): Observable<IProduct[]> {
        console.log(this.accessPointUrl, this.headers)
        return this.http.get<IProduct[]>(this.accessPointUrl, {headers: this.headers}).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
          map((products: IProduct[]) => products.find(p => p.id === id))
        );
      }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occured: ${err.error.message}`;
        }else{
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}