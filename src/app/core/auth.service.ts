import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  isAuthenticatedAsync(): Promise<boolean> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('authToken');
        resolve(!!token);
      } else {
        resolve(false);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
