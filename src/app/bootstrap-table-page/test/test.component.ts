import { DemoTableComponent } from './../demo-table/demo-table.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {

  public singleSelect = 'multiple';
  public sidePagination = 'client';
  public url = './assets/json/test.json';
  public allRows = [];
  public defaultSelectedRows = [{ id: '111' }, { id: '222' }];
  public columns = [
    {
      checkbox: true,
      width: '2%',
      field: 'isChecked',
    },
    {
      field: 'name',
      title: '名称',
      editable: true,
      sortable: true,
      width: '48%'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  checkRow(event: any, flag) {
    // 允许多选时 onCheckAll和onUncheckAll会返回rows数组,onCheck和onUncheck返回的是一个对象
    let curRows = [];
    if (event.length) {
      curRows = event;
    } else {
      curRows.push(event);
    }

    curRows.forEach(row => {
      if (this.allRows.length) {
        this.allRows.forEach(ele => {
          if (ele.id === row.id) {
            ele.isChecked = row.isChecked;
          }
        });
      }
    });
  }

  // 记录所有行数据 默认选中某些行
  recordAllData(e: any, flag) {
    this.allRows = e.dataList;
    if (this.defaultSelectedRows.length) {
      this.allRows.forEach((ele) => {
        ele.isChecked = false;
        this.defaultSelectedRows.forEach(obj => {
          if (ele.id == obj.id) {
            ele.isChecked = true;
          }
        });
      });
    }
  }

  save() {
    // 获取所有选中数据
    let selRows = [];
    this.allRows.forEach(ele => {
      if (ele.isChecked) {
        selRows.push({id: ele.id });
      }
    });
    console.log(selRows);
  }

}
