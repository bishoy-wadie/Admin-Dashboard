import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authUrl = 'https://fakestoreapi.com/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post<any>(this.authUrl, loginData).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError('Login failed. Please try again later.');
      })
    );
  }
}
