import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagePipe'
})
export class PagePipePipe implements PipeTransform {

  transform(inputArray: any[], pageNumber?: number, pageSize?: number): any {
    console.log(inputArray);

    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    const returnedArray = inputArray.slice(startIndex, endIndex);
    return returnedArray;
  }

}
