import { FutureExpenseService } from './../future-expense.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FutureExpense } from '../models/future-expense';

@Component({
  selector: 'app-future-expense',
  templateUrl: './future-expense.component.html',
  styleUrls: ['./future-expense.component.css']
})
export class FutureExpenseComponent implements OnInit {

  futureExpenses = [];
  expenseCategory = [];
  selected = null;
  newFutureExpense: FutureExpense = new FutureExpense();
  editFutureExpense = null;
  destroyFutureExpense = null;
  displayFullTable = true;


  createNewExpense(form: NgForm) {
    console.log('new expense values');
    console.log(this.newFutureExpense);


    for (let i = 0; i < this.expenseCategory.length; i++) {
      if (this.expenseCategory[i].name === form.value.expenseCategory.name) {
        this.newFutureExpense.expenseCategory = this.expenseCategory[i];
      } else {
        this.newFutureExpense.expenseCategory = this.expenseCategory[1];
      }
    }

    console.log('inside component, next line prints new expense');

    console.log(this.newFutureExpense);

    this.newFutureExpense.create(this.newFutureExpense).subscribe(
      data => {
        this.reload();
        this.newFutureExpense = new Expense();

      },
      err => {
        console.log(this.newFutureExpense);

        console.error('Error in component ts: ' + err);
      }
    );
  }

  updateExpense(form, editExpense) {
    console.log('update expense log: ' + editExpense);
    console.log(editExpense);

    this.futureExpenseService.update(editExpense.id, editExpense).subscribe(
      data => {
      this.reload();
      // editExpense = null;
      this.selected = null;
      this.expenseCategory = [];
      this.editExpense = new Expense();
      form.reset();
    },
    err => {
      console.error('update expense had an error in component: ' + err);
    }
  );
  }

  deleteExpense(expense) {
    console.log(expense);

    this.futureExpenseService.destroy(expense).subscribe(
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
    this.futureExpenseService.show(expense).subscribe(
      data => expense,
      err => console.error('no expense at this location')
    );
  }

  reload() {
    this.futureExpenseService
      .index()
      .subscribe(
        data => {
          console.log(data);

          (this.futureExpenses = data);
        },
        err => console.error('loading expense list had an error: ' + err)
      );
    this.futureExpenseService.indexExCat().subscribe(
      data => {
        this.expenseCategory = data;
      },
      err => console.error('error inside of the category reload')
    );
  }



  constructor(
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private futureExpenseService: FutureExpenseService
  ) { }

  ngOnInit() {
  }

}
