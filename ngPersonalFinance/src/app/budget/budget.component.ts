import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})

export class BudgetComponent implements OnInit {
  budgets = [];
  selected = null;
  newBudget: Budget = new Budget();
  createNewBudget = false;
  editBudget: null;
  showComplete = false;
  budgetId = false;
  expenseCategories = [];

  countBudgets() {
     return this.budgets.length;
  }

  displayBudget(budget) {
    this.selected = budget;
  }

  displayTable() {
    this.selected = null;
    this.createNewBudget = null;
  }

  createNewBudgetItem () {
    this.createNewBudget = true;
  }

  addBudget(form: NgForm) {
    this.newBudget.amount = form.value.amount;
    this.newBudget.startDate = form.value.startDate;
    this.newBudget.endDate = form.value.endDate;
    this.newBudget.description = form.value.description;
    for (let i = 0; i < this.expenseCategories.length; i++) {
      if (this.expenseCategories[i].name === form.value.categoryName) {
        this.newBudget.expenseCategory = this.expenseCategories[i];
      }
    }

    this.budgetService.create(this.newBudget).subscribe(
            data => {
              this.newBudget = new Budget();
              form.reset();
              this.createNewBudget = null;
              this.reload();
            },
            err => console.error('Post error' + err)
          );

  }

  setEditBudget() {
    this.editBudget = Object.assign({}, this.selected);
  }

  resetBudget() {
    this.editBudget = null;
  }



  updateBudget(form: NgForm) {
    this.selected.amount = form.value.amount;
    this.selected.startDate = form.value.startDate;
    this.selected.endDate = form.value.endDate;
    this.selected.description = form.value.description;
    for (let i = 0; i < this.expenseCategories.length; i++) {
      console.log(this.expenseCategories[i].name);
      if (this.expenseCategories[i].name === form.value.categoryName) {
        this.selected.expenseCategory = this.expenseCategories[i];
      }
    }

    this.budgetService.update(this.selected).subscribe(
      data => {
        this.resetBudget();
        this.selected = null;
        this.reload();
      },
      err => console.error('Post error' + err)
    );

  }

  destroyBudget(budget) {
    this.budgetService.destroy(budget).subscribe(
      data => {
        this.resetBudget();
        this.selected = null;
        this.reload();
      },
      err => console.error('Post error' + err)
    );
  }


  reload() {
    this.budgetService.index().subscribe(
      (data) => {
                this.budgets = data;
    },
      (err) => console.log('Budget error' + err)
    );

    this.budgetService.indexExpenseCategories().subscribe(
      data => {
         this.expenseCategories = data;
      },
      err => console.error('Budget error' + err)
    );
  }

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.reload();
  }

}
