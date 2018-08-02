import { Injectable } from '@angular/core';
import { DatePipe } from '../../node_modules/@angular/common';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { ActivatedRoute, Router } from '../../node_modules/@angular/router';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private url = environment.baseUrl + 'api/income';


  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) { }
}
