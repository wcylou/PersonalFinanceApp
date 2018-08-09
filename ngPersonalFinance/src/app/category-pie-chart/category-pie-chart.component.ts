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
 // tslint:disable-next-line:no-inferrable-types
 public pieChartType: string = 'pie';
  newMap: object;

  public chartOptions: any = {
    pieceLabel: {
      render: function (args) {
        const label = args.label,
              value = args.value;
        return label + ': ' + value;
      }
    },
    legend: {
      labels: {
           fontColor: 'pink',
           fontSize: 14
          }
       },
  };


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
                  this.pieChartData.push(this.newMap[p].toFixed(0));
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
