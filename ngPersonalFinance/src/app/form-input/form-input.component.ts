import { AllDataTableComponent } from './../all-data-table/all-data-table.component';
import { DatePipe } from '@angular/common';
import { CategoryPieChartComponent } from './../category-pie-chart/category-pie-chart.component';
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

  transformDate(epoch) {
    const d = new Date(0);
    d.setUTCSeconds(epoch);
    console.log('logging d' + d);
    return d;
  }

  createNewFutureExpense(form: NgForm) {
    this.newFutureExpense.amount = form.value.amount;
    this.newFutureExpense.description = form.value.description;
    this.newFutureExpense.expectedDate = form.value.expectedDate;

    this.expenseCategories.forEach(category => {
      if (category.name === form.value.category) {
        this.newFutureExpense.expenseCategory = category;
      }
    });

    if (form.value.recurring === true) {
      this.newFutureExpense.recurring = true;
      this.newFutureExpense.numberOfRecurrences = form.value.numberOfRecurrences;
      if (form.value.frequency === 'weekly') {
        const recurringExpense = Object.assign({}, this.newFutureExpense);
        for (let i = 0; i < this.newFutureExpense.numberOfRecurrences; i++) {
          recurringExpense.expectedDate = new Date(recurringExpense.expectedDate);
          this.fexServ.create(recurringExpense).subscribe(
            data => {
              this.loadIncomeData();
              form.reset();
              this.newFutureExpense = new FutureExpense();
            },
            err => console.error(err)
          );
          recurringExpense.expectedDate.setDate(recurringExpense.expectedDate.getDate() + 7);
        }
      } else if (form.value.frequency === 'monthly') {
        const recurringExpense = Object.assign({}, this.newFutureExpense);
        for (let i = 0; i < this.newFutureExpense.numberOfRecurrences; i++) {
          recurringExpense.expectedDate = new Date(
            recurringExpense.expectedDate
          );
          this.fexServ.create(recurringExpense).subscribe(
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
         recurringExpense.expectedDate.setMonth(
            recurringExpense.expectedDate.getMonth() + 1
          );
        }
      } else {
        const recurringExpense = Object.assign({}, this.newFutureExpense);
        for (let i = 0; i < this.newFutureExpense.numberOfRecurrences; i++) {
          recurringExpense.expectedDate = new Date(
            recurringExpense.expectedDate
          );
          this.fexServ.create(recurringExpense).subscribe(
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
         recurringExpense.expectedDate.setFullYear(
            recurringExpense.expectedDate.getFullYear() + 1
          );
        }
      }
    } else {
      this.newFutureExpense.recurring = false;

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
      err => console.log(err)
    );
  }

  createNewIncomeStream(newIncomeForm: NgForm) {
    this.newIncomeStream.expectedAmount = newIncomeForm.value.expectedAmount;
    this.newIncomeStream.startDate = newIncomeForm.value.startDate;
    this.newIncomeStream.numberOfOccurrences =
      newIncomeForm.value.numberOfRecurrences;
    this.incomeCategories.forEach(category => {
      if (category.name === newIncomeForm.value.category) {
        this.newIncomeStream.incomeCategory = category;
      }
    });
    console.log(this.newIncomeStream);


    if (newIncomeForm.value.recurring === true) {
      this.newIncomeStream.recurring = true;
      this.newIncomeStream.numberOfOccurrences =
      newIncomeForm.value.numberOfRecurrences;
      if (newIncomeForm.value.frequency === 'weekly') {
        const recurringIncome = Object.assign({}, this.newIncomeStream);
        for (let i = 0; i < this.newIncomeStream.numberOfOccurrences; i++) {
          recurringIncome.startDate = new Date(
            recurringIncome.startDate
          );
          this.incServ.createIncomeStream(recurringIncome).subscribe(
            data => {
              this.loadIncomeData();
              newIncomeForm.reset();
              this.newIncomeStream = new IncomeStream();
            },
            err => {
              console.error('Error in component ts: ' + err);
            }
          );
         recurringIncome.startDate.setDate(
            recurringIncome.startDate.getDate() + 7
          );
        }
      } else if (newIncomeForm.value.frequency === 'monthly') {
        const recurringIncome = Object.assign({}, this.newIncomeStream);
        for (let i = 0; i < this.newIncomeStream.numberOfOccurrences; i++) {
          recurringIncome.startDate = new Date(
            recurringIncome.startDate
          );
          this.incServ.createIncomeStream(recurringIncome).subscribe(
            data => {
              this.loadIncomeData();
              newIncomeForm.reset();
              this.newIncomeStream = new IncomeStream();
            },
            err => {
              console.error('Error in component ts: ' + err);
            }
          );
         recurringIncome.startDate.setMonth(
            recurringIncome.startDate.getMonth() + 1
          );
        }
      } else {
        const recurringIncome = Object.assign({}, this.newIncomeStream);
        for (let i = 0; i < this.newIncomeStream.numberOfOccurrences; i++) {
          recurringIncome.startDate = new Date(
            recurringIncome.startDate
          );
          this.incServ.createIncomeStream(recurringIncome).subscribe(
            data => {
              this.loadIncomeData();
              newIncomeForm.reset();
              this.newIncomeStream = new IncomeStream();
            },
            err => {
              console.error('Error in component ts: ' + err);
            }
          );
         recurringIncome.startDate.setFullYear(
            recurringIncome.startDate.getFullYear() + 1
          );
        }
      }
    } else {
      this.newIncomeStream.recurring = false;

      this.incServ.createIncomeStream(this.newIncomeStream).subscribe(
        data => {
          this.loadIncomeData();
          newIncomeForm.reset();
          this.newIncomeStream = new IncomeStream();
        },
        err => {
          console.log(this.newIncomeStream);

          console.error('Error in component ts: ' + err);
        }
      );
    }

    // this.incServ.createIncomeStream(this.newIncomeStream).subscribe(
    //   data => {
    //     this.loadIncomeData();
    //     this.newIncomeStream = new IncomeStream();
    //     newIncomeForm.reset();
    //   },
    //   err => console.log(err)
    // );
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
  constructor(
    private incServ: IncomeService,
    private exServ: ExpenseService,
    private budServ: BudgetService,
    private fexServ: FutureExpenseService,
    private dp: DatePipe
  ) {}

  ngOnInit() {
    this.loadIncomeData();
  }
}
