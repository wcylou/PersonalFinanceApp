import { FormInputComponent } from './form-input/form-input.component';
import { UserComponent } from './user/user.component';
import { ExpenseComponent } from './expense/expense.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent, outlet: 'home'},
    {path: 'expense', component: ExpenseComponent},
    {path: 'user', component: UserComponent, outlet: 'user'},
    {path: 'formInput', component: FormInputComponent, outlet: 'formInput'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
