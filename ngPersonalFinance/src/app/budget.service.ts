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
    return this.http.get<Budget[]>(this.url)
       .pipe(
         catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  show(bid) {
    return this.http.get<Budget>(this.url + '/' + bid)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  create(bid) {
    return this.http.post<Budget>(this.url, bid)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  update(budget: Budget) {
    return this.http.patch<Budget>(this.url + '/' + budget.id, budget)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  destroy(budget: Budget) {
    return this.http.delete(this.url + '/' + budget.id, {responseType: 'text'})
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  indexExpenseCategories() {
    return this.http.get<ExpenseCategory[]>(this.url2)
    .pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError('KABOOM');
      })
    );
  }

  constructor(private http: HttpClient) {}
}
