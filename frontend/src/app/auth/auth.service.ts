import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api.service";
import {BehaviorSubject, first, Observable, shareReplay, Subject} from "rxjs";
import {UserProfile} from "./user-profile";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Auth} from "./Auth";

export interface User {
  userName: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoginMode = new BehaviorSubject<boolean>(false);
  jwtService: JwtHelperService = new JwtHelperService();
  userProfile = new BehaviorSubject<UserProfile | null>(null);
  refreshTask?: NodeJS.Timeout;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
  ) {}

  login(usernameOrEmail:string, password:string ): Observable<any> {
    this.isLoginMode.next(true);
    return this.apiService.post<User>('http://localhost:8000/Auth/Login/',{usernameOrEmail, password})
      .pipe(shareReplay()); // uniemożliwia wyzwolenia wielu żądań POST z powodu wielu subskrypcji.
  }

  setLoginMode(mode:boolean) {
    if(!!this.getToken())
      this.isLoginMode.next(mode);
  }

  setToken(tokens: Auth) {
    this.saveToken(tokens);


    const userInfo = this.jwtService.decodeToken(
      tokens.access_token
    ) as UserProfile;

    localStorage.setItem('userId', JSON.stringify(userInfo.sub));


    const expiresIn = userInfo.exp * 1000 - Date.now();

    clearTimeout(this.refreshTask);
    this.setRefreshTokenTask(expiresIn).subscribe(
      (refreshTask) => this.refreshTask = refreshTask);

    this.userProfile.next(userInfo);
    return true;
  }

  saveToken(tokens: Auth) {
    localStorage.setItem('refresh_token', JSON.stringify(tokens.refresh_token));
    localStorage.setItem('access_token', JSON.stringify(tokens.access_token));
  }

  setRefreshTokenTask(expTime: number): Observable<NodeJS.Timeout> {
    const setTokenAction$ = new Subject<NodeJS.Timeout>();

    this.refreshToken()
      .pipe(first())
      .subscribe({
        next: (tokens: Auth) => {
          const refreshTimeout = setTimeout(() => this.setToken(tokens), expTime);
          setTokenAction$.next(refreshTimeout);
        }
      });

    return setTokenAction$.asObservable();
  }


  refreshToken(): Observable<Auth> {
    const refresh_token = JSON.parse(localStorage.getItem('refresh_token')!);
    const access_token = JSON.parse(this.getToken());

    return this.apiService.post<any>(
      'http://localhost:8000/Auth/Refresh/',
      { access_token,refresh_token}
    ).pipe(shareReplay());
  }


  getToken(): string {
    return localStorage.getItem('access_token')!;
  }

  removeToken(): void {
    this.setLoginMode(false);
    clearTimeout(this.refreshTask);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }

}
