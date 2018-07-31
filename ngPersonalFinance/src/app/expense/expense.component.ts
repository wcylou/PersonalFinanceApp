import { ExpenseCategory } from './../models/expense-category';
import { ExpenseService } from './../expense.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { DatePipe } from '../../../node_modules/@angular/common';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { NgForm } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenses = [];
  expenseCategory = [];
  selected = null;
  newExpense: Expense = new Expense();
  editExpense = null;
  destroyExpense = null;

  createNewExpense(form: NgForm) {
    console.log('new expense values');
    console.log(this.newExpense);


    for (let i = 0; i < this.expenseCategory.length; i++) {
      const element = this.expenseCategory[i];
      if (this.expenseCategory[i].id === form.value.expenseCategory) {
        this.newExpense.expenseCategory = this.expenseCategory[i];
      }
    }

    console.log('inside component, next line prints new expense');

    console.log(this.newExpense);

    this.expenseService.create(this.newExpense).subscribe(
      data => {
        this.reload();
        this.newExpense = new Expense();

      },
      err => {
        console.log(this.newExpense);

        console.error('Error in component ts: ' + err);
      }
    );
  }

  updateExpense(form, editExpense) {
    console.log('update expense log: ' + editExpense);
    console.log(editExpense);


    this.expenseService.update(editExpense.id, editExpense).subscribe(
      data => {
      this.reload();
      editExpense = null;
      form.reset();
    },
    err => {
      console.error('update expense had an error in component: ' + err);
    }
  );
  this.editExpense = new Expense();
  }

  deleteExpense(expense) {
    console.log(expense);

    this.expenseService.destroy(expense).subscribe(
      data => {
        this.reload();
      },
      err => {
        console.error('Delete expense had an error in the component: ' + err);
      }
    );
  }

  displayExpense(expense) {
    this.selected = expense;
  }

  displayTable() {
    this.selected = null;
  }

  setEditExpense() {
    this.editExpense = Object.assign({}, this.selected);
  }

  show(expense) {
    this.expenseService.show(expense).subscribe(
      data => expense,
      err => console.error('no expense at this location')
    );
  }

  reload() {
    this.expenseService
      .index()
      .subscribe(
        data => {
          console.log(data);

          (this.expenses = data);
        },
        err => console.error('loading expense list had an error: ' + err)
      );
    this.expenseService.indexExCat().subscribe(
      data => {
        this.expenseCategory = data;
      },
      err => console.error('error inside of the category reload')
    );
  }

  constructor(
    private expenseService: ExpenseService,
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.reload();
  }
}
