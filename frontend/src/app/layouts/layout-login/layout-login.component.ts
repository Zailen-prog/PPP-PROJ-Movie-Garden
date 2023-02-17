import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout-login',
  templateUrl: './layout-login.component.html',
  styleUrls: ['./layout-login.component.scss']
})
export class LayoutLoginComponent {
  isLogin: boolean = true;
  constructor(
    private authService:AuthService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    console.log('layout login')
    if(!!this.authService.getToken())
      this.authService.setLoginMode(true)

    this.authService.isLoginMode.subscribe((value) => this.isLogin =value)



  }
  logout() {
    return this.authService.removeToken();
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
