import { PagePipePipe } from './../pipes/page-pipe.pipe';
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
import { PageEvent } from '@angular/material';



@Component({
  selector: 'app-all-data-table',
  templateUrl: './all-data-table.component.html',
  styleUrls: ['./all-data-table.component.css']
})
export class AllDataTableComponent implements OnInit {

  expenses = [];
  filteredExpenses = [];

  futureExpenses = [];
  filteredFutureExpenses = [];

  incomes = [];
  filteredIncomes = [];

  incomeStreams = [];
  filteredIncomeStreams = [];

  budgets = [];
  filteredBudgets = [];

  displayedColumnsExpenses = ['amount', 'expenseCategory', 'date', 'description'];
  displayedColumnsFutureExpenses = ['amount', 'expenseCategory', 'expectedDate', 'recurring', 'description'];
  displayedColumnsBudgets = ['amount', 'expenseCategory', 'startDate', 'endDate', 'description'];
  displayedColumnsIncomes = ['amount', 'incomeCategory', 'dateReceived'];
  displayedColumnsIncomeStreams = ['expectedAmount', 'incomeCategory', 'startDate'];

  pageSize = 10;
  pageSizeOptions = [5, 10, 15];

  showExpensesTable = false;
  showFutureExpensesTable = false;
  showBudgetsTable = false;
  showIncomesTable = false;
  showIncomeStreamsTable = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  toggleExpensesTable() {
    if (this.showExpensesTable === false) {
      this.showExpensesTable = true;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = false;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = false;
    } else {
      this.showExpensesTable = false;
    }
  }

  toggleFutureExpensesTable() {
    if (this.showFutureExpensesTable === false) {
      this.showExpensesTable = false;
      this.showFutureExpensesTable = true;
      this.showBudgetsTable = false;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = false;
    } else {
      this.showFutureExpensesTable = false;
    }
  }

  toggleBudgetsTable() {
    if (this.showBudgetsTable === false) {
      this.showExpensesTable = false;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = true;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = false;
    } else {
      this.showBudgetsTable = false;
    }
  }

  toggleIncomesTable() {
    if (this.showBudgetsTable === false) {
      this.showExpensesTable = false;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = false;
      this.showIncomesTable = true;
      this.showIncomeStreamsTable = false;
    } else {
      this.showBudgetsTable = false;
    }
  }

  toggleIncomeStreamsTable() {
    if (this.showIncomeStreamsTable === false) {
      this.showExpensesTable = false;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = false;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = true;
    } else {
      this.showIncomeStreamsTable = false;
    }
  }

  onExpenseRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onFutureExpenseRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onBudgetRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onIncomeRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onIncomeStreamRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  filterList(event) {
    console.log(event);
    this.filteredExpenses = this.pagePipe.transform(this.expenses, event.pageIndex, event.pageSize);
  }

  reload() {

    this.budgetService.index().subscribe(
      data => {
        this.budgets = data;
        this.filteredBudgets = this.pagePipe.transform(this.budgets, 0, this.pageSize);
      },
      err => {
        console.error('data table component could not load budgets');
      }
    );

    this.expenseService.index().subscribe(
      data => {
        this.expenses = data;
        this.filteredExpenses = this.pagePipe.transform(this.expenses, 0, this.pageSize);
      },
      err => {
        console.error('data table component could not load expenses');
      }
    );

    this.futureExpenseService.index().subscribe(
      data => {
        this.futureExpenses = data;
        this.filteredFutureExpenses = this.pagePipe.transform(this.futureExpenses, 0, this.pageSize);
      },
      err => {
        console.error('data table component could not load future expenses');
      }
    );

    this.incomeService.index().subscribe(
      data => {
        this.incomes = data;
        this.filteredIncomes = this.pagePipe.transform(this.incomes, 0, this.pageSize);
      },
      err => {
        console.error('data table component could not load incomes');
      }
    );

    this.incomeService.indexIncomeStream().subscribe(
      data => {
        this.incomeStreams = data;
        this.filteredIncomeStreams = this.pagePipe.transform(this.incomeStreams, 0, this.pageSize);
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
    private pageEvent: PageEvent,
    private pagePipe: PagePipePipe
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
