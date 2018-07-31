import { Injectable } from '@angular/core';
import { DatePipe } from '../../node_modules/@angular/common';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { ActivatedRoute, Router } from '../../node_modules/@angular/router';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Expense } from './models/expense';
import { ExpenseCategory } from './models/expense-category';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private url = environment.baseUrl + 'api/expenses';
  private exCatUrl = environment.baseUrl + 'api/incomeCategories';

  index(): Observable<Expense[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<Expense[]>(this.url, httpOptions).pipe(
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
    return this.http.get<Expense>(this.url + '/' + selectedExpenseId, httpOptions)
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

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.post<Expense>(this.url, newExpense, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('create expense did not work');
      })
    );
  }

  update(expenseId: number, selectedExpense: Expense) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.patch<Expense>(
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
    return this.http.delete<Expense>(this.url + '/' + expenseId, httpOptions);
  }


  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) { }
}
