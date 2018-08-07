import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incomeCategorySelector'
})
export class IncomeCategorySelectorPipe implements PipeTransform {

  transform(inputArray: any[], categoryString?: any): any {

    if (!categoryString) {
      return inputArray;
    }

    const outputArray = [];
    for (let i = 0; i < inputArray.length; i++) {
      const element = inputArray[i];
      if (categoryString.includes(element.incomeCategory.name)) {
        outputArray.push(element);
      }
    }
    return outputArray;
  }

}
