import { ExpenseCategory } from '../models/expense-category';
import { ExpenseService } from '../expense.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  displayFullTable = true;

  createNewExpense(form: NgForm) {
    console.log('new expense values');
    console.log(this.newExpense);
    console.log(form.value.category);


    for (let i = 0; i < this.expenseCategory.length; i++) {
      if (this.expenseCategory[i].name === form.value.category) {
        this.newExpense.expenseCategory.name = this.expenseCategory[i].name;
        this.newExpense.expenseCategory.id = this.expenseCategory[i].id;
      } else {
        this.newExpense.expenseCategory = this.expenseCategory[0];
      }
    }
    console.log(this.newExpense);
    console.log('inside component, next line prints new expense');
    console.log(this.newExpense);

    this.expenseService.create(this.newExpense).subscribe(
      data => {
        this.reload();
        form.reset();
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


    for (let i = 0; i < this.expenseCategory.length; i++) {
      if (this.expenseCategory[i].name === form.value.category) {
        this.editExpense.expenseCategory.name = this.expenseCategory[i].name;
        this.editExpense.expenseCategory.id = this.expenseCategory[i].id;
      } else {
        editExpense.expenseCategory = this.expenseCategory[1];
      }
    }

    this.expenseService.update(editExpense.id, editExpense).subscribe(
      data => {
        form.reset();
        this.selected = null;
        this.editExpense = null;
        this.reload();
    },
    err => {
      console.error('update expense had an error in component: ' + err);
    }
  );
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
    if (this.displayFullTable === true) {
      this.displayFullTable = false;
    } else {
      this.selected = null;
      this.displayFullTable = true;
    }  }

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
    console.log(new Date());
    this.reload();
  }
}
