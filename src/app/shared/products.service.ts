import {IProduct} from '../product-list/product';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private productUrl = '/api/products/products.json';

    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
            .pipe(
                tap(data => console.log('data received is: ', data)),
                catchError(this.handleError)
                );
    }

    handleError(err: HttpErrorResponse) {
        return throwError('error');
    }
}
