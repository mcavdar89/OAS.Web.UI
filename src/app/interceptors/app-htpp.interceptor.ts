import { HttpErrorResponse, HttpEvent, HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const appHtppInterceptor: HttpInterceptorFn = (req, next) => {
  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);

  let token = authService.getLocalToken();

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(req).pipe(
    catchError((erorr) => {
      if ([401, 403].includes(erorr.status)) {
        authService.removeLocalToken();
        router.navigate(['login']);
      }
      return throwError(() => new Error(erorr.erorr?.message || erorr.statusText))
    })
  );
};
