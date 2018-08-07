import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './chart/chart.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { AllDataTableComponent } from './all-data-table/all-data-table.component';
import { FormInputComponent } from './form-input/form-input.component';
import { UserComponent } from './user/user.component';
import { ExpenseComponent } from './expense/expense.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryPieChartComponent } from './category-pie-chart/category-pie-chart.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'frontPage'},
    {path: 'home', component: HomeComponent, outlet: 'home'},
    {path: 'frontPage', component: FrontPageComponent, outlet: 'frontPage'},
    {path: 'account', component: AccountComponent, outlet: 'account'},
    {path: 'expense', component: ExpenseComponent, outlet: 'expense'},
    {path: 'login', component: LoginComponent, outlet: 'login'},
    {path: 'logout', pathMatch: 'full', redirectTo: 'frontPage'},
    {path: 'user', component: UserComponent, outlet: 'user'},
    {path: 'formInput', component: FormInputComponent, outlet: 'formInput'},
    {path: 'allDataTable', component: AllDataTableComponent, outlet: 'allDataTable'},
    {path: 'categoryPieChart', component: CategoryPieChartComponent, outlet: 'categoryPieChart'},
    {path: 'chart', component: ChartComponent, outlet: 'chart'},
    {path: '**', pathMatch: 'full', redirectTo: 'frontPage' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
