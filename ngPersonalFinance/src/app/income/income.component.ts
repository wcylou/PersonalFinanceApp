import { ExpenseCategory } from './../models/expense-category';
import { IncomeService } from './../income.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { DatePipe } from '../../../node_modules/@angular/common';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Income } from '../models/income';
import { IncomeStream } from '../models/income-stream';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomes = [];
  incomeCategories = [];
  incomeStreams = [];

  hideIncome = false;

  selected = null;
  newIncome: Income = new Income();
  editIncome = null;
  incomeView = null;
  // destroyExpense = null;
  selectedStream = null;
  newIncomeStream: IncomeStream = new IncomeStream();
  editIncomeStream = null;
  incomeViewStream = null;

// Income Methods

  addView() {
  this.incomeView = true;
  }
  backToSelected() {
    this.editIncome = null;
  }

  createNewIncome(newIncomeForm: NgForm) {
    this.newIncome.amount = newIncomeForm.value.amount;
    this.newIncome.dateReceived = newIncomeForm.value.dateReceived;
    this.incomeCategories.forEach(category => {
      if (category.name === newIncomeForm.value.category) {
        this.newIncome.incomeCategory = category;
      }
    });
    console.log(newIncomeForm);
    console.log(newIncomeForm.value);
    console.log(this.newIncome);
    this.incomeService.create(this.newIncome).subscribe(
      data => {
        this.loadIncomeData();
        this.newIncome = new Income();
        newIncomeForm.reset();
        this.incomeView = null;
      },
      err =>
      console.log(err)
    );
  }

  updateIncome(editIncomeRecord: NgForm) {
    this.incomeCategories.forEach(category => {
      if (category.name === editIncomeRecord.value.category) {
        this.editIncome.incomeCategory = category;
      }
    });
    this.incomeService.update(this.editIncome.id, this.editIncome).subscribe(
      data => {
      this.selected = data;
      this.loadIncomeData();
      this.editIncome = null;
    },
    err => {
      console.error('update expense had an error in component: ' + err);
    }
  );
  }

  deleteIncome(id) {
    console.log(id);

    this.incomeService.destroy(id).subscribe(
      data => {
        this.loadIncomeData();
        this.selected = null;
      },
      err => {
        console.error('Delete expense had an error in the component: ' + err);
      }
    );
  }

  displayIncome(income) {
    this.selected = income;
  }

  viewAll() {
    this.selected = null;
  }

  setEditIncome() {
    this.editIncome = Object.assign({}, this.selected);
  }

// Income Stream methods below

  addViewStream() {
  this.incomeViewStream = true;
  }
  backToSelectedStream() {
    this.editIncomeStream = null;
  }

  createNewIncomeStream(newIncomeForm: NgForm) {
    this.newIncomeStream.expectedAmount = newIncomeForm.value.expectedAmount;
    this.newIncomeStream.startDate = newIncomeForm.value.startDate;
    this.newIncomeStream.yearlyOccurrences = newIncomeForm.value.yearlyOccurrences;
    this.incomeCategories.forEach(category => {
      if (category.name === newIncomeForm.value.category) {
        this.newIncomeStream.incomeCategory = category;
      }
    });
    this.incomeService.createIncomeStream(this.newIncomeStream).subscribe(
      data => {
        this.loadIncomeData();
        this.newIncomeStream = new IncomeStream();
        newIncomeForm.reset();
        this.incomeViewStream = null;
      },
      err =>
      console.log(err)
    );
  }

  updateIncomeStream(editIncomeRecord: NgForm) {
    this.incomeCategories.forEach(category => {
      if (category.name === editIncomeRecord.value.category) {
        this.editIncomeStream.incomeCategory = category;
      }
    });
    this.incomeService.updateIncomeStream(this.editIncomeStream.id, this.editIncomeStream).subscribe(
      data => {
      this.selectedStream = data;
      this.loadIncomeData();
      this.editIncomeStream = null;
    },
    err => {
      console.error('update expense had an error in component: ' + err);
    }
  );
  }

  deleteIncomeStream(id) {
    console.log('delete income stream' + id);

    this.incomeService.destroyIncomeStream(id).subscribe(
      data => {
        this.loadIncomeData();
        this.selectedStream = null;
      },
      err => {
        console.error('Delete expense had an error in the component: ' + err);
      }
    );
  }

  displayIncomeStream(income) {
    this.selectedStream = income;
  }

  viewAllStream() {
    this.selectedStream = null;
  }

  setEditIncomeStream() {
    this.editIncomeStream = Object.assign({}, this.selectedStream);
  }

  // show(expense) {
  //   this.expenseService.show(expense).subscribe(
  //     data => expense,
  //     err => console.error('no expense at this location')
  //   );
  // }

  loadIncomeData() {
    this.incomeService
      .index()
      .subscribe(
        data => {
          console.log(data);

          (this.incomes = data);
        },
        err => console.error('loading expense list had an error: ' + err)
      );
    this.incomeService.indexInCat().subscribe(
      data => {
        this.incomeCategories = data;
      },
      err => console.error('error inside of the category reload')
    );
    this.incomeService.indexIncomeStream().subscribe(
      data => {
        this.incomeStreams = data;
      },
      err => console.log(err)
    );
  }

  constructor(
    private incomeService: IncomeService,
    private datePipe: DatePipe,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadIncomeData();
  }

}
