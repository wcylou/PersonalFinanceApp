import { UserComponent } from './user/user.component';
import { ExpenseComponent } from './expense/expense.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'expense'},
    {path: 'expense', component: ExpenseComponent},
    {path: 'user', component: UserComponent, outlet: 'user'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
