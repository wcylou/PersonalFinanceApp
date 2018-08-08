import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl;
  private username = null;
  constructor(private http: HttpClient) { }

  getUsername() {
    return this.username;
  }

  login(username, password) {
    // Make token
    this.username = username;
    const token = this.generateBasicAuthToken(username, password);
    console.log(token);
    // Send token as Authorization header (this is spring security convention for basic auth)
    const headers = new HttpHeaders()
      .set('Authorization', `Basic ${token}`);

    // create request to authenticate credentials
    return this.http
      .get(this.url + 'api/login', {headers})
      .pipe(
        tap((res) => {
          localStorage.setItem('token' , token);
          console.log(username + '=====' + password + '====' );
          return res;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  register(user) {
    // create request to register a new account
    return this.http.post(this.url + 'api/register', user)
    .pipe(
        tap((res) => {
          const user2 = res;
            // create a user and then upon success, log them in
          return res;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  generateBasicAuthToken(username, password) {
    return btoa(`${username}:${password}`);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
