import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthApiService } from './auth.service';
import { inject } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthApiService);
  const authToken = authService.getToken();


  if (authToken && !req.url.includes('/auth/signup') && !req.url.includes('/auth/login')) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });

    return next(authReq).pipe(
      catchError((error) => {

        if (error.status === 401) {
          authService.handleUnauthorized();
        }

        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
