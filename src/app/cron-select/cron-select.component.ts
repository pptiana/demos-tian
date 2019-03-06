import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cron-select',
  templateUrl: './cron-select.component.html',
  styleUrls: ['./cron-select.component.css']
})
export class CronSelectComponent implements OnInit {
  public minuteValues = [15, 20, 25, 30, 35, 40, 45, 50, 55];
  public hourValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  public dayValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  public weekdayValues = [
    { name: "周日", value: "1" },
    { name: "周一", value: "2" },
    { name: "周二", value: "3" },
    { name: "周三", value: "4" },
    { name: "周四", value: "5" },
    { name: "周五", value: "6" },
    { name: "周六", value: "7" },
  ];
  public cronType = 'day';
  public seconds = '0';
  public minute ;
  public hour;
  public day;
  public weekday;
  public month;
  public cronString = '';

  // public addForm: FormGroup;
// private formBuilder: FormBuilder
  constructor() { 
    // this.addForm = this.formBuilder.group({
    //   cronType: new FormControl('week', []),
    //   day: new FormControl(null, []),
    //   weekday: new FormControl(null, []),
    //   hour: new FormControl(null, []),
    //   minute: new FormControl(null, []),
    //   });
  }

  ngOnInit() {
  }

  change() {
    let arr = [0];
    arr.push( this.minute ? this.minute : '*');
    arr.push( this.hour ? this.hour : '*');
    arr.push( this.cronType=='month' ? (this.day?this.day:'*') : '?');
    arr.push( this.cronType=='week'?(this.weekday?this.weekday:'*'):'?');
    console.log(arr.join(' '));
    this.cronString = arr.join(' ');
  }

}
