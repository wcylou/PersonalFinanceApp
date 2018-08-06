import { AllDataTableComponent } from './../all-data-table/all-data-table.component';
import { ExpenseService } from './../expense.service';
import { FutureExpenseService } from './../future-expense.service';
import { Component, OnInit } from '@angular/core';
import { FutureExpense } from '../models/future-expense';
import { Expense } from '../models/expense';
import { IncomeService } from '../income.service';
import { DatePipe } from '../../../node_modules/@angular/common';
import { logging } from '../../../node_modules/protractor';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allExpenses = [];
  allBudgets = [];
  allIncome = [];
  lastMonthBudget = 0;
  lastMonthIncome = 0;
  lastMonthExpenses = 0;
  futureExpeneseIndex = [];

  endDate;
  startDate;

  dateObject = {
    start: null,
    end: null
  };

  checkDate(fex: FutureExpense) {
    console.log(new Date(fex.expectedDate).valueOf());
    console.log(Date.now());
    if (new Date(fex.expectedDate).valueOf() < Date.now()) {
      if (window.confirm('Did you pay this expense?')) {
        const futureToExpense = new Expense();
        futureToExpense.amount = fex.amount;
        futureToExpense.expenseCategory = fex.expenseCategory;
        futureToExpense.description = fex.description;
        futureToExpense.date = fex.expectedDate;
        this.exServ.create(futureToExpense).subscribe(
          data => {
            console.log(data);
          },
          err => console.log(err)
        );
      }
      this.fexServ.destroy(fex.id).subscribe(
        data => {
          console.log(data);
        },
        err => console.log(err)
      );
    }
  }


  reload() {
    console.log('in reload');
    this.fexServ.index().subscribe(data => {
      this.futureExpeneseIndex = data;
      console.log(this.futureExpeneseIndex);
      this.futureExpeneseIndex.forEach(
        futureExpense => {
          console.log('in for loop');
          this.checkDate(futureExpense);
        },
        err => console.log(err)
      );
    });



    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 30);
    const date1 = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.dateObject.start = date1;
    const date2 = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.dateObject.end = date2;
    this.exServ
      .getExpenseBetweenDates(this.dateObject)
      .subscribe(data => {
        this.allExpenses = data;
        for (let i = 0; i < this.allExpenses.length; i++) {
          this.lastMonthExpenses += this.allExpenses[i].amount;
        }
       },
       err => console.log(err));

    this.budServ
       .getBudgetBetweenDates(this.dateObject)
       .subscribe(data => {
         this.allBudgets = data;
         for (let i = 0; i < this.allBudgets.length; i++) {
           this.lastMonthBudget += this.allBudgets[i].amount;
         }
        },
        err => console.log(err));

    this.inServ
       .getIncomeBetweenDates(this.dateObject)
       .subscribe(data => {
         this.allIncome = data;
         for (let i = 0; i < this.allIncome.length; i++) {
           this.lastMonthIncome += this.allIncome[i].amount;
         }
        },
        err => console.log(err));

  }

  constructor(
    private fexServ: FutureExpenseService,
    private exServ: ExpenseService,
    private inServ: IncomeService,
    private datePipe: DatePipe,
    private budServ: BudgetService
  ) {}

  ngOnInit() {
    this.reload();
  }
}
