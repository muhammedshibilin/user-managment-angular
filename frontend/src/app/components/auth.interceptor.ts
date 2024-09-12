import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserServiceService } from './user/services/user.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(UserServiceService);
  const authToken = authService.getToken();
  
  console.log('AuthInterceptor: intercept method called', req.url);
  console.log('AuthInterceptor: token retrieved', authToken);

  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    console.log('AuthInterceptor: modified request', authReq);
    return next(authReq);
  }

  console.log('AuthInterceptor: no token, passing request');
  return next(req);
};