import { BudgetService } from './../budget.service';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  displayedColumns: string[] = ['id', 'expenseCategory', 'amount', 'startDate', 'endDate', 'description'];
  budgets: Budget[];
  dataSource;

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
        },
        err => console.log(err)
        );
  }
}
