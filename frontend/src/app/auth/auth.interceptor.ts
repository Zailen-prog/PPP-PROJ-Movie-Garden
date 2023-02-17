import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor(private authService: AuthService) { }
  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   const authToken = this.authService.getToken();
  //   console.log('interceptor',authToken )
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: "Bearer " + authToken
  //     }
  //   });
  //   console.log(localStorage.getItem('access_token'))
  //   return next.handle(req);
  // }

  constructor( private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        url:  req.url,
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
    }

    return next.handle(req);
  }
}
