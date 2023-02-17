import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }


  getToken(login: string , password: string) {

    const body = new HttpParams()
      // .set('grant_type', 'password')
      .set('username', login)
      .set('password', password);

    return this.postForm('http://localhost:4000/', body);
  }

  public postForm<T>(url: string, data: HttpParams): Observable<T> {
    return this.post(url, data);
  }

  public post<T>(url: string, data: any): Observable<T> {

    return this.handleRequest(
      url,
      (requestUrl: string) => this.http.post<T>(requestUrl, data, {observe: "response"}));
  }

  private handleRequest<T>(
    url: string,
    requestAction: (requestUrl: string) => Observable<HttpResponse<T>>): Observable<T> {
    const newRequest = new Subject<T>();

    requestAction(url).subscribe({
      next: (response) => newRequest.next(response.body!),
      error: (err) => this.handleError(err),
    });

    return newRequest.asObservable();
  }


  private handleError<T>(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('Client side error', error);

    } else {
      console.error('Server side error', error);

    }

  }

}
