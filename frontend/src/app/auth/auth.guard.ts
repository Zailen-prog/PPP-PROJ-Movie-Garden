import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    // constructor(
    //     private authService: AuthService,
    //     private router: Router) {}
    //
    // canActivate(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ): boolean {
    //
    //    const isTokenExpired =  this.authService.isTokenExpired();
    //
    //     if ( isTokenExpired ) {
    //
    //         this.authService.removeToken()
    //         this.router.navigate(['']);
    //     }
    //
    //     return !isTokenExpired;
    // }
  constructor(
    private authService: AuthService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const token = this.authService.getToken();

    if (!token) {
      this.authService.removeToken();
    }

    return !!token;
  }
}
