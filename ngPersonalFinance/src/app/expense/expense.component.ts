import { ExpenseService } from './../expense.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { DatePipe } from '../../../node_modules/@angular/common';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenses = [];
  selected = null;
  newExpense: Expense = new Expense();
  editExpense = null;
  destroyExpense = null;

  createNewExpense() {
    this.expenseService.create(this.newExpense).subscribe(
      data => {
        this.reload();
      },
      err => {
        console.error('Error in component ts: ' + err);
      }
    );
    this.newExpense = new Expense();
  }

  updateExpense(editExpense) {
    console.log('update expense log: ' + editExpense);

    this.expenseService.update(editExpense.id, editExpense).subscribe(
      data => {
      this.reload();
      editExpense = null;
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

  reload() {
    this.expenseService
      .index()
      .subscribe(
        data => (this.expenses = data),
        err => console.error('loading expense list had an error: ' + err)
      );
  }

  constructor(
    private expenseService: ExpenseService,
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}
}
