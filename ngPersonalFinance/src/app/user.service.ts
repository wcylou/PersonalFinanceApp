import { Injectable } from '@angular/core';
import { HttpClient} from '../../node_modules/@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl + 'api/users';

  index() {
    return this.http.get<User[]>(this.url)
       .pipe(
         catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  show(uid) {
    return this.http.get<User>(this.url + '/' + uid)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  create(uid) {
    return this.http.post<User>(this.url, uid)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  update(user: User) {
    return this.http.patch<User>(this.url + '/' + user.id, user)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  destroy(user: User) {
    return this.http.delete(this.url + '/' + user.id, {responseType: 'text'})
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
