import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incomeCategorySelector'
})
export class IncomeCategorySelectorPipe implements PipeTransform {

  transform(inputArray: any[], categoryString?: string): any {
    if (!categoryString) {
      return inputArray;
    }
    const categories = categoryString.split(',');
    const outputArray = [];
    for (let i = 0; i < inputArray.length; i++) {
      const element = inputArray[i];
      if (categories.indexOf(element.expenseCategory.name)) {
        outputArray.push(element);
      }
    }


    return outputArray;
  }

}
