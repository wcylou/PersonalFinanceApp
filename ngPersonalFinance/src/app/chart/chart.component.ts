import { BudgetService } from './../budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Budget } from '../models/budget';
import {MatSort} from '@angular/material';
import { CurrencyService } from '../currency.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  displayedColumns: string[] = ['id', 'expenseCategory', 'amount', 'startDate', 'endDate', 'description'];
  budgets: Budget[];
  dataSource;

  dataSource2;
  newMap: object;
  isDataLoaded = false;

  currencyTableSelected = false;
  budgetTableSelected = false;

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showCurrency() {
    this.currencyTableSelected = true;
    this.budgetTableSelected = false;
  }

  showBudgets() {
    this.currencyTableSelected = false;
    this.budgetTableSelected = true;
  }

  constructor(private budServ: BudgetService, private currService: CurrencyService) { }

  ngOnInit() {
      this.budServ.index().subscribe(
        data => {
          this.budgets = data;
          this.dataSource = new MatTableDataSource(this.budgets);
          this.dataSource.sort = this.sort;
        },
        err => console.log(err)
        );

        this.currService.getCurrencies().subscribe(
          data => {
          this.newMap = data;
          this.isDataLoaded = true;
          },
          err => console.error('User create error' + err)
        );
  }
}
