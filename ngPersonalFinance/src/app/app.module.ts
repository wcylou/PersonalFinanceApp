import { CategoryPieChartComponent } from './category-pie-chart/category-pie-chart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { MatFormFieldModule, MatInputModule, MatPaginator, PageEvent, MatNativeDateModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AllDataTableComponent } from './all-data-table/all-data-table.component';

import { MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule } from '@angular/material';
import { FormInputComponent } from './form-input/form-input.component';
import { HomeComponent } from './home/home.component';
import { PagePipePipe } from './pipes/page-pipe.pipe';
import { ChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';
import { FrontPageComponent } from './front-page/front-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';

import { AgmCoreModule } from '@agm/core';


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
    AllDataTableComponent,
    PagePipePipe,
    HomeComponent,
    AllDataTableComponent,
    FrontPageComponent,
  ],
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
    MatSortModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    ChartsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDu3z8H8wEptTmzLK1unAnBejz0QmTc_h8'
    // })
  ],
  providers: [
    BudgetService,
    ExpenseService,
    IncomeService,
    UserService,
    DatePipe,
    PageEvent,
    PagePipePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
