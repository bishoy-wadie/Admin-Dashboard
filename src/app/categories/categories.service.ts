import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = 'https://fakestoreapi.com/products/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      catchError((error) => {
        console.error('Getting categories failed:', error);
        return throwError(error);
      })
    );
  }
}
