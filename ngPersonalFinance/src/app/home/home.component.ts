import { ExpenseCategory } from './../models/expense-category';
import { DialogComponent } from './../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AllDataTableComponent } from './../all-data-table/all-data-table.component';
import { ExpenseService } from './../expense.service';
import { FutureExpenseService } from './../future-expense.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FutureExpense } from '../models/future-expense';
import { Expense } from '../models/expense';
import { IncomeService } from '../income.service';
import { DatePipe } from '../../../node_modules/@angular/common';
import { logging } from '../../../node_modules/protractor';
import { BudgetService } from '../budget.service';
import { IncomeStream } from '../models/income-stream';
import { Income } from '../models/income';

export interface DialogData {
  checked: boolean;
  desc: string;
  cat: string;
}

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
  expenseAgainstIncome = 0;
  futureExpeneseIndex = [];
  incomeStreamIndex = [];
  loadedMessage = false;
  newMap: object;

  endDate;
  startDate;

  dateObject = {
    start: null,
    end: null
  };

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  // tslint:disable-next-line:no-inferrable-types
  public barChartType: string = 'bar';
  // tslint:disable-next-line:no-inferrable-types
  public barChartLegend: boolean = true;
  public barChartData2: number[] = [];
  public barChartData3: number[] = [];

  public barChartData: any[] = [
    { data: this.barChartData3, label: 'Expense' },
    { data: this.barChartData2, label: 'Budget' }
  ];
  // start of copy paste
  openDialog(fex): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { desc: fex.description, cat: fex.expenseCategory.name, checked: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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

    });
  }
  openDialog2(fex): void {
    console.log(fex.amount);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { desc: fex.description, cat: fex.incomeCategory.name, checked: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const futureToExpense = new Income();
        futureToExpense.amount = fex.expectedAmount;
        futureToExpense.incomeCategory = fex.incomeCategory;
        futureToExpense.dateReceived = fex.startDate;
        this.inServ.create(futureToExpense).subscribe(
          data => {
            console.log(data);
          },
          err => console.log(err)
        );
      }
        this.inServ.destroyIncomeStream(fex.id).subscribe(
          data => {
            console.log(data);
          },
          err => console.log(err)
        );

    });
  }

  // ENd of copypaste

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  checkExpenseDate(fex: FutureExpense) {
    console.log(new Date(fex.expectedDate).valueOf());
    console.log(Date.now());
    if (new Date(fex.expectedDate).valueOf() < Date.now()) {
     this.openDialog(fex);
    }
  }
  checkIncomeDate(inStream: IncomeStream) {
    console.log(new Date(inStream.startDate).valueOf());
    console.log(inStream);
    if (new Date(inStream.startDate).valueOf() < Date.now()) {
     this.openDialog2(inStream);
    }
  }

  reload() {
    this.fexServ.index().subscribe(data => {
      this.futureExpeneseIndex = data;
      this.futureExpeneseIndex.forEach(
        futureExpense => {
          this.checkExpenseDate(futureExpense);
        },
        err => console.log(err)
      );
    });
    this.inServ.indexIncomeStream().subscribe(data => {
      this.incomeStreamIndex = data;
      this.incomeStreamIndex.forEach(
        incomeStream => {
          this.checkIncomeDate(incomeStream);
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
    this.exServ.getExpenseBetweenDates(this.dateObject).subscribe(
      data => {
        this.allExpenses = data;
        for (let i = 0; i < this.allExpenses.length; i++) {
          this.lastMonthExpenses += this.allExpenses[i].amount;
        }
        this.expenseAgainstIncome = this.lastMonthExpenses;

        this.inServ.getIncomeBetweenDates(this.dateObject).subscribe(
          data2 => {
            this.allIncome = data2;
            for (let i = 0; i < this.allIncome.length; i++) {
              this.lastMonthIncome += this.allIncome[i].amount;
            }
            this.expenseAgainstIncome =
              (this.expenseAgainstIncome / this.lastMonthIncome) * 100;
            this.loadedMessage = true;
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );

    this.budServ.getBudgetBetweenDates(this.dateObject).subscribe(
      data => {
        this.allBudgets = data;
        for (let i = 0; i < this.allBudgets.length; i++) {
          this.lastMonthBudget += this.allBudgets[i].amount;
          this.barChartLabels.push(this.allBudgets[i].expenseCategory.name);
          this.barChartData2.push(this.allBudgets[i].amount);
        }
        console.log(this.allBudgets);
      },
      err => console.log(err)
    );

    this.exServ.getExpenseByCategoryAndDate(this.dateObject).subscribe(
      data => {
        this.newMap = data;
        for (const p in this.newMap) {
          if (this.newMap.hasOwnProperty(p)) {
            // this.barChartLabels.push(p);
            this.barChartData3.push(this.newMap[p]);
          }
        }
        console.log(this.barChartData3);
      },
      err => console.error('User create error' + err)
    );
  }

  constructor(
    private fexServ: FutureExpenseService,
    private exServ: ExpenseService,
    private inServ: IncomeService,
    private datePipe: DatePipe,
    private budServ: BudgetService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.reload();
  }
}
