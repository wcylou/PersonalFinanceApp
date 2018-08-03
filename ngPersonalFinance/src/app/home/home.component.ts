import { AllDataTableComponent } from './../all-data-table/all-data-table.component';
import { ExpenseService } from './../expense.service';
import { FutureExpenseService } from './../future-expense.service';
import { Component, OnInit } from '@angular/core';
import { FutureExpense } from '../models/future-expense';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  futureExpeneseIndex = [];

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
  }

  constructor(
    private fexServ: FutureExpenseService,
    private exServ: ExpenseService
  ) {}

  ngOnInit() {
    console.log('In init');
    this.reload();
  }
}
