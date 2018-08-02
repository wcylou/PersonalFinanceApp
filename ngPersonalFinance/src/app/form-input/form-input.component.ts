import { Budget } from './../models/budget';
import { FutureExpense } from './../models/future-expense';
import { FutureExpenseService } from './../future-expense.service';
import { BudgetService } from './../budget.service';
import { ExpenseService } from './../expense.service';
import { IncomeService } from './../income.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IncomeStream } from '../models/income-stream';
import { Income } from '../models/income';
import { Expense } from '../models/expense';



@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {

  incomeCategories = [];
  expenseCategories = [];

  newIncome: Income = new Income();
  newIncomeStream: IncomeStream = new IncomeStream();

  newExpense: Expense = new Expense();
  newFutureExpense: FutureExpense = new FutureExpense();

  newBudget: Budget = new Budget();

// adding budgets

  addBudget(form: NgForm) {
    this.newBudget.amount = form.value.amount;
    this.newBudget.startDate = form.value.startDate;
    this.newBudget.endDate = form.value.endDate;
    this.newBudget.description = form.value.description;

   this.expenseCategories.forEach(category => {
        if (form.value.category === category.name) {
          this.newBudget.expenseCategory = category;
        }
   });

    this.budServ.create(this.newBudget).subscribe(
            data => {
              this.loadIncomeData();
              form.reset();
              this.newBudget = new Budget();
            },
            err => console.error('Post error' + err)
          );

  }

// Adding new expenses

  createNewExpense(form: NgForm) {
    this.newExpense.amount = form.value.amount;
    this.newExpense.date = form.value.date;
    this.newExpense.description = form.value.description;

    this.expenseCategories.forEach(category => {
      if (category.name === form.value.category) {
        this.newExpense.expenseCategory = category;
      }
    });

    this.exServ.create(this.newExpense).subscribe(
      data => {
        this.loadIncomeData();
        form.reset();
        this.newExpense = new Expense();

      },
      err => {
        console.log(this.newExpense);

        console.error('Error in component ts: ' + err);
      }
    );
  }

  createNewFutureExpense(form: NgForm) {

    this.newFutureExpense.amount = form.value.amount;
    this.newFutureExpense.description = form.value.description;
    this.newFutureExpense.expectedDate = form.value.expectedDate;

    if (form.value.recurring === true) {
      this.newFutureExpense.recurring = true;
    } else {
      this.newFutureExpense.recurring = false;
    }


      this.expenseCategories.forEach(category => {
          if (category.name === form.value.category) {
            this.newFutureExpense.expenseCategory = category;
          }
        });

    this.fexServ.create(this.newFutureExpense).subscribe(
      data => {
        this.loadIncomeData();
        form.reset();
        this.newFutureExpense = new FutureExpense();

      },
      err => {
        console.log(this.newFutureExpense);

        console.error('Error in component ts: ' + err);
      }
    );
  }


  // Adding new Incomes

  createNewIncome(newIncomeForm: NgForm) {
    this.newIncome.amount = newIncomeForm.value.amount;
    this.newIncome.dateReceived = newIncomeForm.value.dateReceived;
    this.incomeCategories.forEach(category => {
      if (category.name === newIncomeForm.value.category) {
        this.newIncome.incomeCategory = category;
      }
    });
    this.incServ.create(this.newIncome).subscribe(
      data => {
        this.loadIncomeData();
        this.newIncome = new Income();
        newIncomeForm.reset();
        console.log('success');
      },
      err =>
      console.log(err)
    );
  }

  createNewIncomeStream(newIncomeForm: NgForm) {

    this.newIncomeStream.expectedAmount = newIncomeForm.value.expectedAmount;
    this.newIncomeStream.startDate = newIncomeForm.value.startDate;
    this.newIncomeStream.yearlyOccurrences = newIncomeForm.value.yearlyOccurrences;
    this.incomeCategories.forEach(category => {
      if (category.name === newIncomeForm.value.category) {
        this.newIncomeStream.incomeCategory = category;
      }
    });
    this.incServ.createIncomeStream(this.newIncomeStream).subscribe(
      data => {
        this.loadIncomeData();
        this.newIncomeStream = new IncomeStream();
        newIncomeForm.reset();
      },
      err =>
      console.log(err)
    );
  }

  // loading of categories
  loadIncomeData() {
    this.incServ.indexInCat().subscribe(
      data => {
        this.incomeCategories = data;
      },
      err => console.error('error inside of the category reload')
    );
    this.exServ.indexExCat().subscribe(
      data => {
        this.expenseCategories = data;
      },
      err => console.log(err)
    );
  }

  // tslint:disable-next-line:max-line-length
  constructor(private incServ: IncomeService, private exServ: ExpenseService, private budServ: BudgetService, private fexServ: FutureExpenseService) { }

  ngOnInit() {
    this.loadIncomeData();
  }

}
