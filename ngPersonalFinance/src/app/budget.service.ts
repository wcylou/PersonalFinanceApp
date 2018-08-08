import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Budget } from './models/budget';
import { ExpenseCategory } from './models/expense-category';


@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  private url = environment.baseUrl + 'api/budget';
  private url2 = environment.baseUrl + 'api/expenses/categories';

  index() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<Budget[]>(this.url, httpOptions)
       .pipe(
         catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  show(bid) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<Budget>(this.url + '/' + bid, httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  create(bid) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.post<Budget>(this.url, bid, httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  update(budget: Budget) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.patch<Budget>(this.url + '/' + budget.id, budget, httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }
// Another potential broken spot
  destroy(budget: Budget) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`,
        responseType: 'text'
      })
    };
    return this.http.delete(this.url + '/' + budget.id, httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  indexExpenseCategories() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<ExpenseCategory[]>(this.url2, httpOptions)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  getBudgetByCategoryAndDate(dates) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.post<Map<string, number>>(this.url + '/between', dates,  httpOptions);
  }

  constructor(private http: HttpClient, private authService: AuthService) {}
}
