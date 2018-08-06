import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../home/home.component';
import { MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
