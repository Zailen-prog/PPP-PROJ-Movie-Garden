import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-layout-logout',
  templateUrl: './layout-logout.component.html',
  styleUrls: ['./layout-logout.component.scss']
})
export class LayoutComponentLogout{
  isLogin: boolean = false;
  constructor(
    private authService:AuthService,
  ) {}


  ngOnInit(): void {
console.log('layout logout')

    this.authService.isLoginMode.subscribe((value) => console.log(value))


  }
  logout() {
    return this.authService.removeToken();
  }
}
