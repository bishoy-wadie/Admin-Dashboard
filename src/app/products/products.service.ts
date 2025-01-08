import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'https://fakestoreapi.com/products';
  public productsSubject = new BehaviorSubject<any[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      catchError((error) => {
        console.error('Getting products failed:', error);
        return throwError(error);
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        console.error('Deleting product failed:', error);
        return throwError(error);
      }),
      tap(() => {
        const currentProducts = this.productsSubject.value;
        const updatedProducts = currentProducts.filter(
          (product: any) => product.id !== id
        );
        this.productsSubject.next(updatedProducts);
      })
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.url, product).pipe(
      catchError((error) => {
        console.error('Adding product failed:', error);
        return throwError(error);
      }),
      tap((newProduct) => {
        const currentProducts = this.productsSubject.value;
        this.productsSubject.next([...currentProducts, newProduct]);
      })
    );
  }

  editProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, product).pipe(
      catchError((error) => {
        console.error('Editing product failed:', error);
        return throwError(error);
      }),
      tap((updatedProduct) => {
        const currentProducts = this.productsSubject.value;
        const updatedProducts = currentProducts.map((prod) =>
          prod.id === id ? updatedProduct : prod
        );
        this.productsSubject.next(updatedProducts);
      })
    );
  }
}
