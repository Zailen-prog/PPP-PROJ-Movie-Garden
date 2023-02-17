import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, User} from "./auth.service";
import {TokenModel} from "./token-model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserProfile} from "./user-profile";
import {BehaviorSubject, shareReplay} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

export interface authResult {
    idToken: string,
    expiresIn: number
}
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if(this.authService.getToken())
      this.router.navigate(['test']);
  }

  submitForm() {

    if (!this.loginForm.valid) {
      return;
    }
    const {userName, password} = this.loginForm.value;
    this.authService.login(userName, password).subscribe(
      {
        next: (response) => {
          this.authService.setToken(response)
          this.router.navigate(['test']);
        },
      })

  }


}
