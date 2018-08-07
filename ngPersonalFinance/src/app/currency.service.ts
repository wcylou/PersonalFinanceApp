import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private url = environment.baseUrl + 'api/currencies';

  getCurrencies() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.authService.getToken()}`
    })
  };
  return this.http.get<Map<string, number>>(this.url, httpOptions).pipe(
    catchError((err: any) => {
      console.log('Currency retrieval error');
      return throwError('error in curr category');
    })
  );

  }
  constructor(private http: HttpClient, private authService: AuthService) { }
}


