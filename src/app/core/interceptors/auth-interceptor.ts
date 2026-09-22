import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.obterToken();
  const requisicaoAutenticada = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(requisicaoAutenticada).pipe(
    catchError((erro) => {
      if (erro.status === 401) {
        authService.logout();
        router.navigateByUrl('/login');
      }
      return throwError(() => erro);
    }),
  );
};
