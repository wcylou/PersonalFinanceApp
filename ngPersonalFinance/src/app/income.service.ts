import { IncomeStream } from './models/income-stream';
import { IncomeCategory } from './models/income-category';
import { Injectable } from '@angular/core';
import { DatePipe } from '../../node_modules/@angular/common';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { ActivatedRoute, Router } from '../../node_modules/@angular/router';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Income } from './models/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private url = environment.baseUrl + 'api/income';
  private streamUrl = environment.baseUrl + 'api/incomeStream';

  index(): Observable<Income[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<Income[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log('error retrieving expense index');
        return throwError('expense index error');
      })
    );
  }
  indexInCat() {
    return this.http.get<IncomeCategory[]>(this.url + '/categories').pipe(
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
    return this.http.get<Income>(this.url + '/' + selectedExpenseId, httpOptions)
            .pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError('show expense did not work');
              })
            );
  }

  create(newIncome) {
    console.log('inside of the service');

    console.log(newIncome);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.post<Income>(this.url, newIncome, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('create income did not work');
      })
    );
  }

  update(incomeId: number, updateIncome: Income) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.patch<Income>(
      this.url + '/' + incomeId, updateIncome, httpOptions
    );
  }

  destroy(incomeId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.delete<Income>(this.url + '/' + incomeId, httpOptions);
  }
  indexIncomeStream(): Observable<IncomeStream[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<IncomeStream[]>(this.streamUrl, httpOptions).pipe(
      catchError((err: any) => {
        console.log('error retrieving expense index');
        return throwError('expense index error');
      })
    );
  }

  showIncomeStream(selectedExpenseId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.get<IncomeStream>(this.streamUrl + '/' + selectedExpenseId, httpOptions)
            .pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError('show expense did not work');
              })
            );
  }

  createIncomeStream(newIncome) {
    console.log('inside of the service');

    console.log(newIncome);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.post<IncomeStream>(this.streamUrl, newIncome, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('create income did not work');
      })
    );
  }

  updateIncomeStream(incomeId: number, updateIncome: IncomeStream) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.patch<IncomeStream>(
      this.streamUrl + '/' + incomeId, updateIncome, httpOptions
    );
  }

  destroyIncomeStream(incomeId: number) {
    console.log('in income stream delete');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Basic ${this.authService.getToken()}`
      })
    };
    return this.http.delete<IncomeStream>(this.streamUrl + '/' + incomeId, httpOptions);
  }

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) { }
}
