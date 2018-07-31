import { ExpenseCategory } from './../models/expense-category';
import { IncomeService } from './../income.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { DatePipe } from '../../../node_modules/@angular/common';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Income } from '../models/income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  // incomes = [];
  // expenseCategory = [];
  // selected = null;
  // newExpense: Income = new Income();
  // editExpense = null;
  // destroyExpense = null;

  // createNewExpense(form: NgForm) {
  //   console.log('new expense values');
  //   console.log(this.newExpense);


  //   for (let i = 0; i < this.expenseCategory.length; i++) {
  //     const element = this.expenseCategory[i];
  //     if (this.expenseCategory[i].id === form.value.categoryId) {
  //       this.newExpense.category = this.expenseCategory[i];
  //       console.log();
  //     }
  //   }

  //   console.log('inside component, next line prints new expense');

  //   console.log(this.newExpense);

  //   this.incomeService.create(this.newExpense).subscribe(
  //     data => {
  //       this.reload();
  //     },
  //     err => {
  //       console.log(this.newExpense);

  //       console.error('Error in component ts: ' + err);
  //     }
  //   );
  //   this.newExpense = new Income();
  // }

  // updateExpense(form, editExpense) {
  //   console.log('update expense log: ' + editExpense);
  //   console.log(editExpense);


  //   this.expenseService.update(editExpense.id, editExpense).subscribe(
  //     data => {
  //     this.reload();
  //     editExpense = null;
  //     form.reset();
  //   },
  //   err => {
  //     console.error('update expense had an error in component: ' + err);
  //   }
  // );
  // this.editExpense = new Expense();
  // }

  // deleteExpense(expense) {
  //   console.log(expense);

  //   this.expenseService.destroy(expense).subscribe(
  //     data => {
  //       this.reload();
  //     },
  //     err => {
  //       console.error('Delete expense had an error in the component: ' + err);
  //     }
  //   );
  // }

  // displayExpense(expense) {
  //   this.selected = expense;
  // }

  // displayTable() {
  //   this.selected = null;
  // }

  // setEditExpense() {
  //   this.editExpense = Object.assign({}, this.selected);
  // }

  // show(expense) {
  //   this.expenseService.show(expense).subscribe(
  //     data => expense,
  //     err => console.error('no expense at this location')
  //   );
  // }

  // reload() {
  //   this.expenseService
  //     .index()
  //     .subscribe(
  //       data => {
  //         console.log(data);

  //         (this.incomes = data);
  //       },
  //       err => console.error('loading expense list had an error: ' + err)
  //     );
  //   this.expenseService.indexExCat().subscribe(
  //     data => {
  //       this.expenseCategory = data;
  //     },
  //     err => console.error('error inside of the category reload')
  //   );
  // }

  constructor(
    private incomeService: IncomeService,
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
