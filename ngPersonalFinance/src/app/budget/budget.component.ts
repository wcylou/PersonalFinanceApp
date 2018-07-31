import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
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
      if (this.expenseCategories[i].name === form.value.expenseCategory) {
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



  // updatePost(form: NgForm) {
  //   this.selected.title = form.value.title;
  //   this.selected.name = form.value.date;
  //   this.selected.email = form.value.email;
  //   this.selected.description = form.value.description;
  //   this.selected.price = form.value.price;
  //   this.selected.brand = form.value.brand;
  //   this.selected.name = form.value.name;
  //   console.log(form.value.categoryName);

  //   for (let i = 0; i < this.categories.length; i++) {
  //     if (this.categories[i].name === form.value.categoryName) {
  //       this.selected.category = this.categories[i];
  //     }
  //   }
  //   this.postService.update(this.selected).subscribe(
  //     data => {
  //       this.resetPost();
  //       this.selected = null;
  //       this.reload();
  //     },
  //     err => console.error('Post error' + err)
  //   );
  //   console.log(this.selected);

  // }

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
