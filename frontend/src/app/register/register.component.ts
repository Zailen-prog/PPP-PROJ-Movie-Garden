import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    if(this.authService.getToken())
      this.router.navigate(['test']);
  }

  submitForm() {

    if (!this.registerForm.valid) {
      return;
    }
    const {userName, password, email} = this.registerForm.value;
    this.http.post<any>(`http://localhost:8000/User/Register/`, {userName, password, email}).subscribe();
    this.router.navigate(['login']);


  }

}
