import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface response {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isAdmin = new BehaviorSubject<boolean>(false);

  user = new BehaviorSubject<User>(null);

  Signup(email: string, password: string) {
    return this.http
      .post<response>('http://localhost:3000/auth/signup', { email, password })
      .pipe(
        catchError(this.errorHandler),
        tap((res) => this.authHandler(res.email))
      );
  }

  Login(email: string, password: string) {
    return this.http
      .post<response>('http://localhost:3000/auth/signin', {
        email,
        password,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((res) => this.authHandler(res.email))
      );
  }

  Logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('authUser');
    this.isAdmin.next(false);
    return this.http
      .post<response>('http://localhost:3000/auth/signout', {})
      .subscribe();
  }

  autoLogin() {
    const currUser = JSON.parse(localStorage.getItem('authUser'));
    if (!currUser) {
      return;
    }
    const loadedUser = new User(currUser.email);

    if (loadedUser.email) {
      this.user.next(loadedUser);
      if (loadedUser.email === 'admin@admin.com') {
        this.isAdmin.next(true);
      }
    }
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMes = 'An unknown error occurred!';

    if (error.error.message) {
      errorMes = error.error.message;
    }
    return throwError(() => new Error(errorMes));
  }

  private authHandler(email: string) {
    const newUser = new User(email);

    this.user.next(newUser);

    localStorage.setItem('authUser', JSON.stringify(newUser));

    if (newUser.email === 'admin@admin.com') {
      this.isAdmin.next(true);
    }

    this.router.navigate(['/events']);
  }
}
