import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-category-pie-chart',
  templateUrl: './category-pie-chart.component.html',
  styleUrls: ['./category-pie-chart.component.css']
})
export class CategoryPieChartComponent implements OnInit {
 // Pie
 public pieChartLabels: string[] = [];
 public isDataLoaded = false;
 public pieChartData: number[] = [];
 dateToday = Date.now();

//  public pieChartData: number[] = [];
 // tslint:disable-next-line:no-inferrable-types
 public pieChartType: string = 'pie';
  newMap: object;


  public chartColors: any[] = [
    {
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0']
    }];

 // events
 public chartClicked(e: any): void {
   console.log(e);
 }

 public chartHovered(e: any): void {
   console.log(e);
 }

 reload() {
    this.expenseService.getExpenseByCategory().subscribe(
            data => {
              this.newMap = data;
              console.log(this.dateToday);


              // tslint:disable-next-line:prefer-const
              for (let p in this.newMap) {
                if (this.newMap.hasOwnProperty(p)) {
                  this.pieChartLabels.push(p);
                  this.pieChartData.push(this.newMap[p]);
                }
              }
            this.isDataLoaded = true;
            },
            err => console.error('User create error' + err)
          );
  }



  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.reload();
  }

}
