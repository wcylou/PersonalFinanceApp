import { CategorySelectorPipe } from './../pipes/category-selector.pipe';
import { ExpenseCategory } from './../models/expense-category';
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
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '../../../node_modules/@angular/material';
import { tap } from '../../../node_modules/rxjs/operators';
import { PageEvent, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Sort } from '@angular/material';
import { IncomeCategorySelectorPipe } from '../pipes/income-category-selector.pipe';
import { NgbModal, ModalDismissReasons } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-data-table',
  templateUrl: './all-data-table.component.html',
  styleUrls: ['./all-data-table.component.css']
})
export class AllDataTableComponent implements OnInit {
  endDate;
  startDate;
  loadedStartDate = false;
  showAll = true;

  dateObject = {
    start: null,
    end: null
  };
  budgets = [];
  filteredBudgets = [];
  budgetsByDate = [];
  filteredBudgetsByDate = [];
  selectedBudgetsCategories = '';
  budgetsCategories = new FormControl();
  budgetsCategorySelector = [];

  expenses = [];
  expensesCategories = new FormControl();
  expenseCategorySelector = [];
  selectedExpenseCategories = '';
  filteredExpenses = [];
  expenseDataSource = new MatTableDataSource(this.filteredExpenses);
  expensesByDate = [];
  filteredExpensesByDate = [];

  futureExpenses = [];
  filteredFutureExpenses = [];
  selectedFutureExpensesCategories = '';
  futureExpensesCategories = new FormControl();
  futureExpensesCategorySelector = [];

  incomes = [];
  filteredIncomes = [];
  incomesByDate = [];
  filteredIncomesByDate = [];
  selectedIncomeCategories = '';
  incomesCategories = new FormControl();
  incomesCategoriesSelector = [];

  incomeStreams = [];
  filteredIncomeStreams = [];
  selectedIncomeStreamsCategories = '';
  incomeStreamsCategories = new FormControl();
  incomeStreamsCategoriesSelector = [];

  // display column order for each table
  displayedColumnsExpenses = [
    'amount',
    'expenseCategory',
    'date',
    'description',
    'delete'
  ];
  displayedColumnsExpensesByDate = [
    'amount',
    'expenseCategory',
    'date',
    'description',
    'delete'
  ];

  displayedColumnsFutureExpenses = [
    'amount',
    'expenseCategory',
    'expectedDate',
    'recurring',
    'description',
    'delete'
  ];

  displayedColumnsBudgets = [
    'amount',
    'expenseCategory',
    'startDate',
    'endDate',
    'description',
    'delete'
  ];

  displayedColumnsBudgetsByDate = [
    'amount',
    'expenseCategory',
    'startDate',
    'endDate',
    'description',
    'delete'
  ];

  displayedColumnsIncomes = ['amount', 'incomeCategory', 'dateReceived', 'delete'];
  displayedColumnsIncomesByDate = ['amount', 'incomeCategory', 'dateReceived', 'delete'];
  displayedColumnsIncomeStreams = [
    'expectedAmount',
    'incomeCategory',
    'startDate',
    'delete'
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
  pageSizeOptions = [5, 10, 15, 25];

  showBudgetsTable = false;
  showBudgetsTableByDate = false;
  showExpensesTable = false;
  showExpensesByDateTable = false;
  showFutureExpensesTable = false;
  showIncomesTable = false;
  showIncomesTableByDate = false;
  showIncomeStreamsTable = false;

  // selected by category toggles
  budgetsSelectedByCategory = false;
  expensesSelectedByCategory = false;
  futureExpensesSelectedByCategory = false;
  incomesSelectedByCategory = false;
  incomeStreamsSelectedByCategory = false;

  budgetsSelectedByCategoryAndDate = false;
  expensesSelectedByCategoryAndDate = false;
  incomesSelectedByCategoryAndDate = false;

  closeResult: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  deleteBudgetRow(budget) {
    this.budgetService.destroy(budget).subscribe(
      data => {
        this.reload();
      },
      err => {
        console.error('womp, budget delete did not work');
        this.reload();
      }
    );
  }

  deleteExpenseRow(expense) {
    this.expenseService.destroy(expense.id).subscribe(
      data => {
        this.reload();
      },
      err => {
        console.error('womp, expense delete did not work');
        this.reload();
      }
    );
  }

  deleteFutureExpenseRow(futureExpense) {
    this.futureExpenseService.destroy(futureExpense.id).subscribe(
      data => {
        this.reload();
      },
      err => {
        console.error('womp, future expense delete did not work');
        this.reload();
      }
    );
  }

  deleteIncomeRow(income) {
    this.incomeService.destroy(income.id).subscribe(
      data => {
        this.reload();
      },
      err => {
        console.error('womp, income delete did not work');
        this.reload();
      }
    );
  }

  deleteIncomeStreamRow(incomeStream) {
    this.incomeService.destroyIncomeStream(incomeStream.id).subscribe(
      data => {
        this.reload();
      },
      err => {
        console.error('womp, income stream delete did not work');
        this.reload();
      }
    );
  }

  resetAllCategories() {
    this.budgetsCategories.reset();
    this.expensesCategories.reset();
    this.futureExpensesCategories.reset();
    this.incomesCategories.reset();
    this.incomeStreamsCategories.reset();
    this.reload();
  }

  // category filters
  setBudgetsCategoryFilter() {

    this.sortedBudgets = this.expenseCategoryPipe.transform(
      this.budgets,
      this.selectedBudgetsCategories
    );

    this.budgetsSelectedByCategory = true;

    this.filteredBudgets = this.pagePipe.transform(
      this.sortedBudgets,
      this.currentPage,
      this.pageSize
    );
    return this.sortedBudgets;
  }

  setBudgetsCategoryFilterByDate() {

    this.sortedBudgetsByDate = this.expenseCategoryPipe.transform(
      this.budgetsByDate,
      this.selectedBudgetsCategories
    );

    this.budgetsSelectedByCategoryAndDate = true;

    this.filteredBudgetsByDate = this.pagePipe.transform(
      this.sortedBudgetsByDate,
      this.currentPage,
      this.pageSize
    );
    return this.sortedBudgetsByDate;
  }

  setExpensesCategoryFilter() {
    this.sortedExpenses = this.expenseCategoryPipe.transform(
      this.expenses,
      this.selectedExpenseCategories
    );

    this.expensesSelectedByCategory = true;

    this.filteredExpenses = this.pagePipe.transform(
      this.sortedExpenses,
      this.currentPage,
      this.pageSize
    );
    return this.sortedExpenses;
  }

  setExpensesCategoryFilterByDate() {
    this.sortedExpensesByDate = this.expenseCategoryPipe.transform(
      this.expensesByDate,
      this.selectedExpenseCategories
    );

    this.expensesSelectedByCategoryAndDate = true;

    this.filteredExpensesByDate = this.pagePipe.transform(
      this.sortedExpensesByDate,
      this.currentPage,
      this.pageSize
    );
    return this.sortedExpensesByDate;
  }

  setFutureExpensesCategoryFilter() {
    this.sortedFutureExpenses = this.expenseCategoryPipe.transform(
      this.futureExpenses,
      this.selectedFutureExpensesCategories
    );

    this.futureExpensesSelectedByCategory = true;

    this.filteredExpenses = this.pagePipe.transform(
      this.sortedFutureExpenses,
      this.currentPage,
      this.pageSize
    );
    return this.sortedFutureExpenses;
  }

  setIncomesCategoryFilter() {
    this.sortedIncomes = this.incomeCategoryPipe.transform(
      this.incomes,
      this.selectedIncomeCategories
    );

    this.incomesSelectedByCategory = true;

    this.filteredIncomes = this.pagePipe.transform(
      this.sortedIncomes,
      this.currentPage,
      this.pageSize
    );
    return this.sortedIncomes;
  }

  setIncomesCategoryFilterByDate() {
    this.sortedIncomesByDate = this.incomeCategoryPipe.transform(
      this.incomesByDate,
      this.selectedIncomeCategories
    );

    this.incomesSelectedByCategoryAndDate = true;

    this.filteredIncomesByDate = this.pagePipe.transform(
      this.sortedIncomesByDate,
      this.currentPage,
      this.pageSize
    );
    return this.sortedIncomesByDate;
  }

  setIncomeStreamsCategoryFilter() {
    this.sortedIncomeStreams = this.incomeCategoryPipe.transform(
      this.incomeStreams,
      this.selectedIncomeStreamsCategories
    );

    this.incomeStreamsSelectedByCategory = true;

    this.filteredIncomeStreams = this.pagePipe.transform(
      this.sortedIncomeStreams,
      this.currentPage,
      this.pageSize
    );
    return this.sortedIncomeStreams;
  }

  setInitialStartDate() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 30);
  }

  // toggle switches for showing tables
  toggleBudgetsTable() {
    if (
      this.showBudgetsTable === false &&
      this.showBudgetsTableByDate === false
    ) {
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = true;
      this.showBudgetsTableByDate = true;
      this.showIncomesTable = false;
      this.showIncomesTableByDate = false;
      this.showIncomeStreamsTable = false;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
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
      this.showIncomesTableByDate = false;
      this.showIncomeStreamsTable = false;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
    } else {
      this.showBudgetsTableByDate = false;
    }
  }

  toggleExpensesTable() {
    if (
      this.showExpensesTable === false &&
      this.showExpensesByDateTable === false
    ) {
      this.showExpensesTable = true;
      this.showExpensesByDateTable = true;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = false;
      this.showBudgetsTableByDate = false;
      this.showIncomesTable = false;
      this.showIncomesTableByDate = false;
      this.showIncomeStreamsTable = false;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
    } else {
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
    }
  }

  toggleExpensesByDateTable() {
    if (this.showExpensesByDateTable === false) {
      this.showExpensesTable = false;
      this.showExpensesByDateTable = true;
      this.showFutureExpensesTable = false;
      this.showBudgetsTable = false;
      this.showBudgetsTableByDate = false;
      this.showIncomesTable = false;
      this.showIncomeStreamsTable = false;
      this.showIncomesTableByDate = false;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
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
      this.showBudgetsTableByDate = false;
      this.showIncomesTable = false;
      this.showIncomesTableByDate = false;
      this.showIncomeStreamsTable = false;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
    } else {
      this.showFutureExpensesTable = false;
    }
  }

  toggleIncomesTable() {
    if (
      this.showIncomesTable === false &&
      this.showIncomesTableByDate === false
    ) {
      this.showBudgetsTable = false;
      this.showBudgetsTableByDate = false;
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = false;
      this.showIncomesTableByDate = true;
      this.showIncomesTable = true;
      this.showIncomeStreamsTable = false;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
    } else {
      this.showIncomesTable = false;
      this.showIncomesTableByDate = false;
    }
  }

  toggleIncomesByDateTable() {
    if (this.showIncomesTableByDate === false) {
      this.showBudgetsTable = false;
      this.showBudgetsTableByDate = false;
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = false;
      this.showIncomesTable = false;
      this.showIncomesTableByDate = true;
      this.showIncomeStreamsTable = false;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
    } else {
      this.showIncomesTableByDate = false;
    }
  }

  toggleIncomeStreamsTable() {
    if (this.showIncomeStreamsTable === false) {
      this.showBudgetsTable = false;
      this.showBudgetsTableByDate = false;
      this.showExpensesTable = false;
      this.showExpensesByDateTable = false;
      this.showFutureExpensesTable = false;
      this.showIncomesTable = false;
      this.showIncomesTableByDate = false;
      this.showIncomeStreamsTable = true;
      this.budgetsSelectedByCategory = false;
      this.expensesSelectedByCategory = false;
      this.futureExpensesSelectedByCategory = false;
      this.incomesSelectedByCategory = false;
      this.incomeStreamsSelectedByCategory = false;
      this.budgetsSelectedByCategoryAndDate = false;
      this.expensesSelectedByCategoryAndDate = false;
      this.incomesSelectedByCategoryAndDate = false;
    } else {
      this.showIncomeStreamsTable = false;
    }
  }

  filterBudgetList(event) {
    this.currentPage = event.pageIndex;
    this.filteredBudgets = this.pagePipe.transform(
      this.sortedBudgets,
      event.pageIndex,
      event.pageSize
    );
  }

  filterBudgetListByDate(event) {
    this.currentPage = event.pageIndex;
    this.filteredBudgetsByDate = this.pagePipe.transform(
      this.sortedBudgetsByDate,
      event.pageIndex,
      event.pageSize
    );
  }

  filterExpensesList(event) {
    this.currentPage = event.pageIndex;
    this.filteredExpenses = this.pagePipe.transform(
      this.sortedExpenses,
      event.pageIndex,
      event.pageSize
    );
  }

  filterExpensesByDateList(event) {
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
    const budgetsByCategory = this.setBudgetsCategoryFilter();
    if (
      !sort.active ||
      (sort.direction === '' && !this.budgetsSelectedByCategory)
    ) {
      this.sortedBudgets = budgetsData;
      return;
    }

    if (this.budgetsSelectedByCategory) {
      this.sortedBudgets = budgetsByCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
    } else {
      this.sortedBudgets = budgetsData.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
  }

  sortBudgetsByDate(sort: Sort) {
    const budgetsDataByDate = this.budgets.slice();
    const budgetsByDateAndCategory = this.setBudgetsCategoryFilter();
    if (
      !sort.active ||
      (sort.direction === '' && !this.budgetsSelectedByCategory)
    ) {
      this.sortedBudgetsByDate = budgetsDataByDate;
      return;
    }

    if (this.budgetsSelectedByCategory) {
      this.sortedBudgetsByDate = budgetsByDateAndCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
    } else {
      this.sortedBudgetsByDate = budgetsDataByDate.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
  }

  sortExpenses(sort: Sort) {
    const expensesData = this.expenses.slice();
    const expensesByCategory = this.setExpensesCategoryFilter();
    if (
      !sort.active ||
      (sort.direction === '' && !this.expensesSelectedByCategory)
    ) {
      this.sortedExpenses = expensesData;
      return;
    }

    if (this.expensesSelectedByCategory) {
      this.sortedExpenses = expensesByCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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

    } else {
      this.sortedExpenses = expensesData.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
  }

  sortExpensesByDate(sort: Sort) {
    const expensesDataByDate = this.expensesByDate.slice();
    const expensesByDateAndCategory = this.setExpensesCategoryFilterByDate();
    if (!sort.active || (sort.direction === '' && !this.expensesSelectedByCategory)) {
      this.sortedExpensesByDate = expensesDataByDate;
      return; }
    if (this.expensesSelectedByCategory) {
      this.sortedExpensesByDate = expensesByDateAndCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount': return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name': return this.compare(a.expenseCategory.name, b.expenseCategory.name, isAsc);
          case 'date': return this.compare(a.date, b.date, isAsc);
          default: return 0;
        }
      });
      this.filteredExpensesByDate = this.pagePipe.transform(this.sortedExpensesByDate, this.currentPage, this.pageSize);

    } else {
      this.sortedExpensesByDate = expensesDataByDate.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
  }

  sortFutureExpenses(sort: Sort) {
    const futureExpensesData = this.futureExpenses.slice();
    const futureExpensesByCategory = this.setFutureExpensesCategoryFilter();
    if (
      !sort.active ||
      (sort.direction === '' && !this.futureExpensesSelectedByCategory)
    ) {
      this.sortedFutureExpenses = futureExpensesData;
      return;
    }

    if (this.futureExpensesSelectedByCategory) {
      this.sortedFutureExpenses = futureExpensesByCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
    } else {
      this.sortedFutureExpenses = futureExpensesData.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'expenseCategory.name':
            return this.compare(
              a.expenseCategory.name,
              b.expenseCategory.name,
              isAsc
            );
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
  }

  sortIncomes(sort: Sort) {
    const incomesData = this.incomes.slice();
    const incomesByCategory = this.setIncomesCategoryFilter();
    if (
      !sort.active ||
      (sort.direction === '' && !this.incomesSelectedByCategory)
    ) {
      this.sortedIncomes = incomesData;
      return;
    }

    if (this.incomesSelectedByCategory) {
      this.sortedIncomes = incomesByCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'incomeCategory.name':
            return this.compare(
              a.incomeCategory.name,
              b.incomeCategory.name,
              isAsc
            );
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
    } else {
      this.sortedIncomes = incomesData.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'incomeCategory.name':
            return this.compare(
              a.incomeCategory.name,
              b.incomeCategory.name,
              isAsc
            );
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
  }

  sortIncomesByDate(sort: Sort) {
    const incomesDataByDate = this.incomes.slice();
    const incomesByDateAndCategory = this.setIncomesCategoryFilter();
    if (
      !sort.active ||
      (sort.direction === '' && !this.incomesSelectedByCategory)
    ) {
      this.sortedIncomesByDate = incomesDataByDate;
      return;
    }

    if (this.incomesSelectedByCategory) {
      this.sortedIncomesByDate = incomesByDateAndCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'incomeCategory.name':
            return this.compare(
              a.incomeCategory.name,
              b.incomeCategory.name,
              isAsc
            );
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
    } else {
      this.sortedIncomesByDate = incomesDataByDate.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'amount':
            return this.compare(a.amount, b.amount, isAsc);
          case 'incomeCategory.name':
            return this.compare(
              a.incomeCategory.name,
              b.incomeCategory.name,
              isAsc
            );
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
  }

  sortIncomeStreams(sort: Sort) {
    const futureIncomesData = this.incomeStreams.slice();
    const futureIncomesByCategory = this.setIncomeStreamsCategoryFilter();
    if (
      !sort.active ||
      (sort.direction === '' && !this.incomeStreamsSelectedByCategory)
    ) {
      this.sortedIncomeStreams = futureIncomesData;
      return;
    }

    if (this.incomeStreamsSelectedByCategory) {
      this.sortedIncomeStreams = futureIncomesByCategory.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'expectedAmount':
            return this.compare(a.expectedAmount, b.expectedAmount, isAsc);
          case 'incomeCategory.name':
            return this.compare(
              a.incomeCategory.name,
              b.incomeCategory.name,
              isAsc
            );
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
    } else {
      this.sortedIncomeStreams = futureIncomesData.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'expectedAmount':
            return this.compare(a.expectedAmount, b.expectedAmount, isAsc);
          case 'incomeCategory.name':
            return this.compare(
              a.incomeCategory.name,
              b.incomeCategory.name,
              isAsc
            );
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
  }

  // subscribe functions between dates
  findBudgetsBetweenDates() {
    const date1 = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.dateObject.start = date1;
    const date2 = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.dateObject.end = date2;
    this.budgetService.getBudgetBetweenDates(this.dateObject).subscribe(
      data => {
        if (this.selectedBudgetsCategories !== '') {
          this.budgetsByDate = data;
          this.sortedBudgetsByDate = this.expenseCategoryPipe.transform(
            this.budgetsByDate,
            this.selectedBudgetsCategories
          );
          this.filteredBudgetsByDate = this.pagePipe.transform(
            this.sortedBudgetsByDate,
            0,
            this.pageSize
          );
        } else {
        this.budgetsByDate = data;
        this.sortedBudgetsByDate = data;
        this.filteredBudgetsByDate = this.pagePipe.transform(
          this.sortedBudgetsByDate,
          0,
          this.pageSize
        );
      }
      },
      err => console.log(err)
    );
  }

  findExpensesBetweenDates() {
    const date1 = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.dateObject.start = date1;
    const date2 = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.dateObject.end = date2;
    this.expenseService.getExpenseBetweenDates(this.dateObject).subscribe(
      data => {
        if (this.selectedExpenseCategories !== '') {
          this.expensesByDate = data;
          this.sortedExpensesByDate = this.expenseCategoryPipe.transform(
            this.expensesByDate,
            this.selectedExpenseCategories
          );
          this.filteredExpensesByDate = this.pagePipe.transform(
            this.sortedExpensesByDate,
            0,
            this.pageSize
          );
        } else {
        this.expensesByDate = data;
        this.sortedExpensesByDate = data;
        this.filteredExpensesByDate = this.pagePipe.transform(
          this.sortedExpensesByDate,
          0,
          this.pageSize
        );
      }
      },
      err => console.log(err)
    );
  }

  findIncomesBetweenDates() {
    const date1 = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.dateObject.start = date1;
    const date2 = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.dateObject.end = date2;
    this.incomeService.getIncomeBetweenDates(this.dateObject).subscribe(
      data => {
        if (this.selectedIncomeCategories !== '') {
          this.incomesByDate = data;
          this.sortedIncomesByDate = this.incomeCategoryPipe.transform(
            this.incomesByDate,
            this.selectedIncomeCategories
          );
          this.filterIncomesListByDate = this.pagePipe.transform(
            this.sortedIncomesByDate,
            0,
            this.pageSize
          );
        } else {
          this.incomesByDate = data;
          this.sortedIncomesByDate = data;
          this.filteredIncomesByDate = this.pagePipe.transform(
            this.sortedIncomesByDate,
            0,
            this.pageSize
          );
        }
      },
      err => console.log(err)
    );
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

    this.budgetService.indexExpenseCategories().subscribe(
      data => {
        this.budgetsCategorySelector = data;
      },
      err => console.error('error inside of budget category reload')
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

    this.expenseService.indexExCat().subscribe(
      data => {
        this.expenseCategorySelector = data;
      },
      err => console.error('error inside of the category reload')
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

    this.futureExpenseService.indexExCat().subscribe(
      data => {
        this.futureExpensesCategorySelector = data;
      },
      err => console.error('error inside of the future expense category reload')
    );

    this.incomeService.index().subscribe(
      data => {
        this.incomes = data;
        this.sortedIncomes = this.incomes;
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

    this.incomeService.indexInCat().subscribe(
      data => {
        this.incomesCategoriesSelector = data;
      },
      err => console.error('error inside of the income category reload')
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

    this.incomeService.indexInCat().subscribe(
      data => {
        this.incomeStreamsCategoriesSelector = data;
      },
      err => console.error('error inside of the income stream category reload')
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
    private pagePipe: PagePipePipe,
    private expenseCategoryPipe: CategorySelectorPipe,
    private incomeCategoryPipe: IncomeCategorySelectorPipe,
    private dialog: MatDialog,
    private modalService: NgbModal
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
