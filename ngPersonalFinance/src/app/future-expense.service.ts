import { AuthService } from './auth.service';
import { ExpenseService } from './expense.service';
import { FutureExpense } from './models/future-expense';
import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExpenseCategory } from './models/expense-category';
import { Expense } from './models/expense';

@Injectable({
  providedIn: 'root'
})
export class FutureExpenseService {
  private url = environment.baseUrl + 'api/futureExpense';
  private exCatUrl = environment.baseUrl + 'api/expenses/categories';
  myDate = new Date();


  index(): Observable<FutureExpense[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<ExpenseCategory[]>(this.exCatUrl, httpOptions).pipe(
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
        Authorization: `Basic ${this.authService.getToken()}`
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

  create(newFutureExpense) {
    console.log('inside of the service');

    console.log(newFutureExpense);
    console.log(newFutureExpense.expenseCategory);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.post<FutureExpense>(this.url, newFutureExpense, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('create expense did not work');
      })
    );
  }

  update(expenseId: number, selectedExpense: FutureExpense) {
    console.log('updated future expense object below');

    console.log(selectedExpense);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.authService.getToken()}`
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
        Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.delete<FutureExpense>(this.url + '/' + expenseId, httpOptions);
  }
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private exServ: ExpenseService,
    private authService: AuthService
  ) { }
}
