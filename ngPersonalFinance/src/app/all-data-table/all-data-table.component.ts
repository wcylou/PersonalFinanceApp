import { Income } from './../models/income';
import { FutureExpense } from './../models/future-expense';
import { Expense } from './../models/expense';
import { Budget } from './../models/budget';
import { BudgetComponent } from './../budget/budget.component';
import { ExpenseComponent } from './../expense/expense.component';
import { FutureExpenseComponent } from './../future-expense/future-expense.component';
import { IncomeComponent } from './../income/income.component';
import { ExpenseService } from './../expense.service';
import { FutureExpenseService } from './../future-expense.service';
import { IncomeService } from './../income.service';
import { BudgetService } from './../budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '../../../node_modules/@angular/material';
import { tap } from '../../../node_modules/rxjs/operators';



@Component({
  selector: 'app-all-data-table',
  templateUrl: './all-data-table.component.html',
  styleUrls: ['./all-data-table.component.css']
})
export class AllDataTableComponent implements OnInit {

  expenses = [];
  futureExpenses = [];
  incomes = [];
  incomeStreams = [];
  budgets = [];
  displayedColumnsExpenses = ['amount', 'expenseCategory', 'date', 'description'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  onExpenseRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  reload() {

    this.budgetService.index().subscribe(
      data => {
        this.budgets = data;
      },
      err => {
        console.error('data table component could not load budgets');
      }
    );

    this.expenseService.index().subscribe(
      data => {
        this.expenses = data;
      },
      err => {
        console.error('data table component could not load expenses');
      }
    );

    this.futureExpenseService.index().subscribe(
      data => {
        this.futureExpenses = data;
      },
      err => {
        console.error('data table component could not load future expenses');
      }
    );

    this.incomeService.index().subscribe(
      data => {
        this.incomes = data;
      },
      err => {
        console.error('data table component could not load incomes');
      }
    );

    this.incomeService.indexIncomeStream().subscribe(
      data => {
        this.incomeStreams = data;
      },
      err => {
        console.error('data table component could not load income streams');
      }
    );


  }


  constructor(
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    private futureExpenseService: FutureExpenseService,
    private incomeService: IncomeService,
  ) { }

  ngOnInit() {
    this.reload();
  }

  // ngAfterViewInit() {
  //   this.paginator.page.pipe(
  //     tap(() => this.reload())
  //   ).subscribe();
  // }

}
