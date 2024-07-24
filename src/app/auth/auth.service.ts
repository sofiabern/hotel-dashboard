import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Types
import { User, SignupApiResponse, LoginApiResponse, LogoutApiResponse } from './user.types';

// Etc
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'https://hotel-dashboard-backend.onrender.com/auth';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private currentUsernameSubject = new BehaviorSubject<string | null>(null);
  currentUsername$ = this.currentUsernameSubject.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
    this.checkInitialAuthentication();
  }

  private checkInitialAuthentication(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);

    const storedUserName = localStorage.getItem('currentUsername');
    if (storedUserName) {
      this.currentUsernameSubject.next(storedUserName);
    } else if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signup(user: User): Observable<SignupApiResponse> {
    return this.http.post<SignupApiResponse>(`${this.apiUrl}/signup`, user).pipe(
      tap(() => this.toastr.success('Signup successful!')),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  signupAndLogin(userData: User): Observable<LoginApiResponse> {
    return this.signup(userData).pipe(
      switchMap(() => this.login({ email: userData.email, password: userData.password }))
    );
  }

  login(user: Omit<User, 'name'>): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((response: LoginApiResponse) => {
        if (response) {
          localStorage.setItem('token', response.data.token);
          this.isAuthenticatedSubject.next(true);
          this.getCurrentUser().subscribe();
          this.toastr.success('Login successful!');
        }
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getCurrentUser(): Observable<Omit<User, 'password'>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Omit<User, 'password'>>(`${this.apiUrl}/current`, { headers }).pipe(
      tap(response => {
        localStorage.setItem('currentUsername', response.name);

        this.currentUsernameSubject.next(response.name);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearLocalStorage();
        this.router.navigate(['/authorization']);
        this.toastr.success('Logged out successfully!');
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.clearLocalStorage();
          this.router.navigate(['/authorization']);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  handleUnauthorized(): void {
    this.clearLocalStorage();
    this.router.navigate(['/authorization']);
    this.toastr.error('Session expired. Please log in again.');
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUsername');
    this.currentUsernameSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred. Please try again later.';
  if (error.status === 409) {
    errorMessage = 'The email address you provided is already registered. Please use a different email or log in.';
  } else if (error.status === 401) {
    errorMessage = 'The credentials you entered are incorrect. Please double-check and try again.';
  } else if (error.status === 404) {
    errorMessage = "We couldn't find an account with that email address. Please check and try again.";
  }


    this.toastr.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
