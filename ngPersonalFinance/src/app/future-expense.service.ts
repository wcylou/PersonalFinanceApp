import { FutureExpense } from './models/future-expense';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExpenseCategory } from './models/expense-category';

@Injectable({
  providedIn: 'root'
})
export class FutureExpenseService {
  private url = environment.baseUrl + 'api/futureExpense';
  private exCatUrl = environment.baseUrl + 'api/expenses/categories';

  index(): Observable<FutureExpense[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<FutureExpense[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log('error retrieving expense index');
        return throwError('expense index error');
      })
    );
  }

  indexExCat() {
    return this.http.get<ExpenseCategory[]>(this.exCatUrl).pipe(
      catchError((err: any) => {
        console.log('category retrieval error');
        return throwError('error in index category');
      })
    );
  }

  show(selectedExpenseId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<FutureExpense>(this.url + '/' + selectedExpenseId, httpOptions)
            .pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError('show expense did not work');
              })
            );
  }

  create(newExpense) {
    console.log('inside of the service');

    console.log(newExpense);
    console.log(newExpense.expenseCategory);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.post<FutureExpense>(this.url, newExpense, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('create expense did not work');
      })
    );
  }

  update(expenseId: number, selectedExpense: FutureExpense) {
    console.log('updated expense object below');

    console.log(selectedExpense);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.patch<FutureExpense>(
      this.url + '/' + expenseId, selectedExpense, httpOptions
    );
  }

  destroy(expenseId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.delete<FutureExpense>(this.url + '/' + expenseId, httpOptions);
  }
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) { }
}
