import { BudgetService } from './../budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Budget } from '../models/budget';
import {MatSort} from '@angular/material';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  displayedColumns: string[] = ['id', 'expenseCategory', 'amount', 'startDate', 'endDate', 'description'];
  budgets: Budget[];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private budServ: BudgetService) { }

  ngOnInit() {
      this.budServ.index().subscribe(
        data => {
          this.budgets = data;
          console.log(this.budgets);
          this.dataSource = new MatTableDataSource(this.budgets);
          this.dataSource.sort = this.sort;
        },
        err => console.log(err)
        );
  }
}
