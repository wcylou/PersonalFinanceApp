import { ExpenseCategory } from './../models/expense-category';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorySelector'
})
export class CategorySelectorPipe implements PipeTransform {

  transform(inputArray: any[], categoryString?: any): any {

    if (!categoryString) {
      return inputArray;
    }

    const outputArray = [];
    for (let i = 0; i < inputArray.length; i++) {
      const element = inputArray[i];
      if (categoryString.includes(element.expenseCategory.name)) {
        outputArray.push(element);
      }
    }
    return outputArray;
  }

}
