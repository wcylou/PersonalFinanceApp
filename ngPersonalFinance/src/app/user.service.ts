import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '../../node_modules/@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl + 'api/users';
  private environUrl = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.authService.getToken()}`
    })
  };
  index() {
    return this.http.get<User[]>(this.url, this.httpOptions)
       .pipe(
         catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  show(uid) {
    return this.http.get<User>(this.url + '/' + uid, this.httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  create(uid) {
    return this.http.post<User>(this.environUrl + 'api/register', uid, this.httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  update(user: User) {
    return this.http.patch<User>(this.url + '/' + user.id, user, this.httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  destroy(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`,
        responseType: 'text'
      })
    };
    return this.http.delete(this.url + '/' + user.id, httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
}
