import { UserService } from './user.service';
import { IncomeService } from './income.service';
import { BudgetService } from './budget.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
<<<<<<< HEAD
import { AllDataTableComponent } from './all-data-table/all-data-table.component';

import { MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule } from '@angular/material';
=======
import { CategoryPieChartComponent } from './category-pie-chart/category-pie-chart.component';
import {MatToolbarModule} from '@angular/material/toolbar';

>>>>>>> 8e5d86d1ae2a11b8f5582d21e03731e49e6d7176
import { FormInputComponent } from './form-input/form-input.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    IncomeComponent,
    ExpenseComponent,
    BudgetComponent,
    FutureExpenseComponent,
    CategoryPieChartComponent,
    FormInputComponent,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
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
