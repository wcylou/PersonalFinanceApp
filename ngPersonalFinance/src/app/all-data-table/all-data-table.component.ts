import { IncomeStream } from './../models/income-stream';
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
import { NgForm, FormControl } from '@angular/forms';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '../../../node_modules/@angular/material';
import { tap } from '../../../node_modules/rxjs/operators';
import { PageEvent } from '@angular/material';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-all-data-table',
  templateUrl: './all-data-table.component.html',
  styleUrls: ['./all-data-table.component.css']
})
export class AllDataTableComponent implements OnInit {
  endDate;
  startDate;
  loadedStartDate = false;

  dateObject = {
    start: null,
    end: null
  };

  expenses = [];
  filteredExpenses = [];
  expenseDataSource = new MatTableDataSource(this.filteredExpenses);
  expensesByDate = [];
  filteredExpensesByDate = [];

  futureExpenses = [];
  filteredFutureExpenses = [];

  incomes = [];
  filteredIncomes = [];
  incomesByDate = [];
  filteredIncomesByDate = [];

  incomeStreams = [];
  filteredIncomeStreams = [];

  budgets = [];
  filteredBudgets = [];
  budgetsByDate = [];
  filteredBudgetsByDate = [];

  // display column order for each table
  displayedColumnsExpenses = [
    'amount',
    'expenseCategory',
    'date',
    'description'
  ];
  displayedColumnsExpensesByDate = [
    'amount',
    'expenseCategory',
    'date',
    'description'
  ];

  displayedColumnsFutureExpenses = [
    'amount',
    'expenseCategory',
    'expectedDate',
    'recurring',
    'description'
  ];

  displayedColumnsBudgets = [
    'amount',
    'expenseCategory',
    'startDate',
    'endDate',
    'description'
  ];

  displayedColumnsBudgetsByDate = [
    'amount',
    'expenseCategory',
    'startDate',
    'endDate',
    'description'
  ];

  displayedColumnsIncomes = ['amount', 'incomeCategory', 'dateReceived'];
  displayedColumnsIncomesByDate = ['amount', 'incomeCategory', 'dateReceived'];
  displayedColumnsIncomeStreams = [
    'expectedAmount',
    'incomeCategory',
    'startDate'
  ];

  sortedBudgets: Budget[];
  sortedBudgetsByDate: Budget[];
  sortedExpenses: Expense[];
  sortedExpensesByDate: Expense[];
  sortedFutureExpenses: FutureExpense[];
  sortedIncomes: Income[];
  sortedIncomesByDate: Income[];
  sortedIncomeStreams: IncomeStream[];

  currentPage = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15];

  showBudgetsTable = false;
  showBudgetsTableByDate = false;
  showExpensesTable = false;
  showExpensesByDateTable = false;
  showFutureExpensesTable = false;
  showIncomesTable = false;
  showIncomesTableByDate = false;
  showIncomeStreamsTable = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  setInitialStartDate() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 30);
    console.log(this.startDate);
  }

  // toggle switches for showing tables
    toggleBudgetsTable() {
      if (this.showBudgetsTable === false) {
        this.showExpensesTable = false;
        this.showExpensesByDateTable = false;
        this.showFutureExpensesTable = false;
        this.showBudgetsTable = true;
        this.showIncomesTable = false;
        this.showIncomeStreamsTable = false;
      } else {
        this.showBudgetsTable = false;
      }
    }

    toggleBudgetsByDateTable() {
      if (this.showBudgetsTableByDate === false) {
        this.showBudgetsTable = false;
        this.showBudgetsTableByDate = true;
        this.showExpensesTable = false;
        this.showExpensesByDateTable = false;
        this.showFutureExpensesTable = false;
        this.showIncomesTable = false;
        this.showIncomeStreamsTable = false;
      } else {
        this.showBudgetsTableByDate = false;
      }
    }

  toggleExpensesTable() {
    if (this.showExpensesTable === false) {
      this.showExpensesTable = true;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = false;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = false;
    } else {
      this.showExpensesTable = false;
    }
  }

  toggleExpensesByDateTable() {
    if (this.showExpensesByDateTable === false) {
      this.showExpensesTable = false;
      this.showExpensesByDateTable = true;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = false;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = false;
    } else {
      this.showExpensesByDateTable = false;
    }
  }

  toggleFutureExpensesTable() {
    if (this.showFutureExpensesTable === false) {
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = true;
      this.showBudgetsTable = false;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = false;
    } else {
      this.showFutureExpensesTable = false;
    }
  }

  toggleIncomesTable() {
    if (this.showIncomesTable === false) {
      this.showBudgetsTable = false;
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = false;
      this.showIncomesTable = true;
      this.showIncomeStreamsTable = false;
    } else {
      this.showIncomesTable = false;
    }
  }

  toggleIncomesByDateTable() {
    if (this.showIncomesTableByDate === false) {
      this.showBudgetsTable = false;
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = false;
      this.showIncomesTable = false;
      this.showIncomesTableByDate = true;
      this.showIncomeStreamsTable = false;
    } else {
      this.showIncomesTableByDate = false;
    }
  }

  toggleIncomeStreamsTable() {
    if (this.showIncomeStreamsTable === false) {
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
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

  filterBudgetList(event) {
    console.log(event);
    this.currentPage = event.pageIndex;
    this.filteredBudgets = this.pagePipe.transform(
      this.sortedBudgets,
      event.pageIndex,
      event.pageSize
    );
  }

  filterBudgetListByDate(event) {
    console.log(event);
    this.currentPage = event.pageIndex;
    this.filteredBudgetsByDate = this.pagePipe.transform(
      this.sortedBudgetsByDate,
      event.pageIndex,
      event.pageSize
    );
  }

  filterExpensesList(event) {
    console.log(event);
    this.currentPage = event.pageIndex;
    this.filteredExpenses = this.pagePipe.transform(
      this.sortedExpenses,
      event.pageIndex,
      event.pageSize
    );
  }

  filterExpensesByDateList(event) {
    console.log(event);
    this.currentPage = event.pageIndex;
    this.filteredExpensesByDate = this.pagePipe.transform(
      this.sortedExpensesByDate,
      event.pageIndex,
      event.pageSize
    );
  }

  filterFutureExpensesList(event) {
    this.currentPage = event.pageIndex;
    this.filteredFutureExpenses = this.pagePipe.transform(
      this.sortedFutureExpenses,
      event.pageIndex,
      event.pageSize
    );
  }

  filterIncomesList(event) {
    this.currentPage = event.pageIndex;
    this.filteredIncomes = this.pagePipe.transform(
      this.sortedIncomes,
      event.pageIndex,
      event.pageSize
    );
  }

  filterIncomesListByDate(event) {
    this.currentPage = event.pageIndex;
    this.filteredIncomesByDate = this.pagePipe.transform(
      this.sortedIncomesByDate,
      event.pageIndex,
      event.pageSize
    );
  }

  filterIncomeStreamsList(event) {
    this.currentPage = event.pageIndex;
    this.filteredIncomes = this.pagePipe.transform(
      this.sortedIncomes,
      event.pageIndex,
      event.pageSize
    );
  }

  // sorting functions
  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortBudgets(sort: Sort) {
    const budgetsData = this.budgets.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedBudgets = budgetsData;
      return;
    }

    this.sortedBudgets = budgetsData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'expenseCategory':
          return this.compare(a.expenseCategory, b.expenseCategory, isAsc);
        case 'startDate':
          return this.compare(a.startDate, b.startDate, isAsc);
        case 'endDate':
          return this.compare(a.endDate, b.endDate, isAsc);
        default:
          return 0;
      }
    });

    this.filteredBudgets = this.pagePipe.transform(
      this.sortedBudgets,
      this.currentPage,
      this.pageSize
    );
  }

  sortBudgetsByDate(sort: Sort) {
    const budgetsDataByDate = this.budgets.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedBudgetsByDate = budgetsDataByDate;
      return;
    }

    this.sortedBudgetsByDate = budgetsDataByDate.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'expenseCategory':
          return this.compare(a.expenseCategory, b.expenseCategory, isAsc);
        case 'startDate':
          return this.compare(a.startDate, b.startDate, isAsc);
        case 'endDate':
          return this.compare(a.endDate, b.endDate, isAsc);
        default:
          return 0;
      }
    });

    this.filteredBudgetsByDate = this.pagePipe.transform(
      this.sortedBudgetsByDate,
      this.currentPage,
      this.pageSize
    );
  }

  sortExpenses(sort: Sort) {
    const expensesData = this.expenses.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedExpenses = expensesData;
      return;
    }

    this.sortedExpenses = expensesData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'expenseCategory':
          return this.compare(a.expenseCategory, b.expenseCategory, isAsc);
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });

    this.filteredExpenses = this.pagePipe.transform(
      this.sortedExpenses,
      this.currentPage,
      this.pageSize
    );
  }

  sortExpensesByDate(sort: Sort) {
    const expensesDataByDate = this.expensesByDate.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedExpensesByDate = expensesDataByDate;
      return;
    }

    this.sortedExpensesByDate = expensesDataByDate.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'expenseCategory':
          return this.compare(a.expenseCategory, b.expenseCategory, isAsc);
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });

    this.filteredExpensesByDate = this.pagePipe.transform(
      this.sortedExpensesByDate,
      this.currentPage,
      this.pageSize
    );
  }

  sortFutureExpenses(sort: Sort) {
    const futureExpensesData = this.futureExpenses.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedFutureExpenses = futureExpensesData;
      return;
    }

    this.sortedFutureExpenses = futureExpensesData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'expenseCategory':
          return this.compare(a.expenseCategory, b.expenseCategory, isAsc);
        case 'expectedDate':
          return this.compare(a.expectedDate, b.expectedDate, isAsc);
        default:
          return 0;
      }
    });

    this.filteredFutureExpenses = this.pagePipe.transform(
      this.sortedFutureExpenses,
      this.currentPage,
      this.pageSize
    );
  }

  sortIncomes(sort: Sort) {
    const incomesData = this.incomes.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedIncomes = incomesData;
      return;
    }

    this.sortedIncomes = incomesData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'incomeCategory':
          return this.compare(a.incomeCategory, b.incomeCategory, isAsc);
        case 'dateReceived':
          return this.compare(a.dateReceived, b.dateReceived, isAsc);
        default:
          return 0;
      }
    });

    this.filteredIncomes = this.pagePipe.transform(
      this.sortedIncomes,
      this.currentPage,
      this.pageSize
    );
  }

  sortIncomesByDate(sort: Sort) {
    const incomesDataByDate = this.incomes.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedIncomesByDate = incomesDataByDate;
      return;
    }

    this.sortedIncomesByDate = incomesDataByDate.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'incomeCategory':
          return this.compare(a.incomeCategory, b.incomeCategory, isAsc);
        case 'dateReceived':
          return this.compare(a.dateReceived, b.dateReceived, isAsc);
        default:
          return 0;
      }
    });

    this.filteredIncomesByDate = this.pagePipe.transform(
      this.sortedIncomesByDate,
      this.currentPage,
      this.pageSize
    );
  }

  sortIncomeStreams(sort: Sort) {
    const futureIncomesData = this.incomeStreams.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedIncomeStreams = futureIncomesData;
      return;
    }

    this.sortedIncomeStreams = futureIncomesData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'expectedAmount':
          return this.compare(a.expectedAmount, b.expectedAmount, isAsc);
        case 'incomeCategory':
          return this.compare(a.incomeCategory, b.incomeCategory, isAsc);
        case 'startDate':
          return this.compare(a.startDate, b.startDate, isAsc);
        default:
          return 0;
      }
    });

    this.filteredIncomeStreams = this.pagePipe.transform(
      this.sortedIncomeStreams,
      this.currentPage,
      this.pageSize
    );
  }

  // subscribe functions between dates
  findBudgetsBetweenDates() {

    const date1 = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.dateObject.start = date1;
    const date2 = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.dateObject.end = date2;
    console.log(this.dateObject);
    this.budgetService
      .getBudgetBetweenDates(this.dateObject)
      .subscribe(data => {
        console.log(data);
        this.budgetsByDate = data;
        this.filteredBudgetsByDate = data;
        this.toggleBudgetsByDateTable();
       },
       err => console.log(err));
  }

  findExpensesBetweenDates() {

    const date1 = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.dateObject.start = date1;
    const date2 = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.dateObject.end = date2;
    console.log(this.dateObject);
    this.expenseService
      .getExpenseBetweenDates(this.dateObject)
      .subscribe(data => {
        console.log(data);
        this.expensesByDate = data;
        this.filteredExpensesByDate = data;
        this.toggleExpensesByDateTable();
       },
       err => console.log(err));
  }

  findIncomesBetweenDates() {

    const date1 = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.dateObject.start = date1;
    const date2 = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.dateObject.end = date2;
    console.log(this.dateObject);
    this.incomeService
      .getIncomeBetweenDates(this.dateObject)
      .subscribe(data => {
        console.log(data);
        this.incomesByDate = data;
        this.filteredIncomesByDate = data;
        this.toggleIncomesByDateTable();
       },
       err => console.log(err));
  }


  // reload the various arrays
  reload() {
    this.budgetService.index().subscribe(
      data => {
        this.budgets = data;
        this.sortedBudgets = this.budgets;
        this.filteredBudgets = this.pagePipe.transform(
          this.sortedBudgets,
          0,
          this.pageSize
        );
      },
      err => {
        console.error('data table component could not load budgets');
      }
    );

    this.expenseService.index().subscribe(
      data => {
        this.expenses = data;
        this.sortedExpenses = this.expenses;
        this.filteredExpenses = this.pagePipe.transform(
          this.sortedExpenses,
          0,
          this.pageSize
        );
      },
      err => {
        console.error('data table component could not load expenses');
      }
    );

    this.futureExpenseService.index().subscribe(
      data => {
        this.futureExpenses = data;
        this.sortedFutureExpenses = this.futureExpenses;
        this.filteredFutureExpenses = this.pagePipe.transform(
          this.sortedFutureExpenses,
          0,
          this.pageSize
        );
      },
      err => {
        console.error('data table component could not load future expenses');
      }
    );

    this.incomeService.index().subscribe(
      data => {
        this.incomes = data;
        this.filteredIncomes = this.pagePipe.transform(
          this.incomes,
          0,
          this.pageSize
        );
      },
      err => {
        console.error('data table component could not load incomes');
      }
    );

    this.incomeService.indexIncomeStream().subscribe(
      data => {
        this.incomeStreams = data;
        this.filteredIncomeStreams = this.pagePipe.transform(
          this.incomeStreams,
          0,
          this.pageSize
        );
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
  ) {
    this.sortedBudgets = this.budgets.slice();
    this.sortedExpenses = this.expenses.slice();
    this.sortedFutureExpenses = this.futureExpenses.slice();
    this.sortedIncomes = this.incomes.slice();
    this.sortedIncomeStreams = this.incomeStreams.slice();
  }

  ngOnInit() {
    this.setInitialStartDate();
    this.reload();
    this.loadedStartDate = true;
  }

}
