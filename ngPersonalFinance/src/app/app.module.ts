import { UserService } from './user.service';
import { IncomeService } from './income.service';
import { BudgetService } from './budget.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpenseService } from './expense.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FutureExpenseComponent } from './future-expense/future-expense.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    IncomeComponent,
    ExpenseComponent,
    BudgetComponent,
    FutureExpenseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    // NgbModule.forRoot()
  ],
  providers: [
    BudgetService,
    ExpenseService,
    IncomeService,
    UserService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
