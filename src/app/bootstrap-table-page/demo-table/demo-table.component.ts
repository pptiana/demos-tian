import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html'
})
export class DemoTableComponent implements OnInit {
  @Input()
  columns: Array<any>;
  @Input()
  url: string;
  @Input()
  singleSelect: boolean;
  @Input()
  sidePagination: string; // 有值(一般可设为'client') 表示客户端分页
  @Output()
  check: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  dataUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {
    let that = this;
    $('#demotable').bootstrapTable({
      url: that.url, // 请求后台的URL（*）
      method: 'get', // 请求方式（*）
      pagination: true, // 是否显示分页（*）
      queryParamsType: '',
      sidePagination: that.sidePagination ? that.sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
      pageNumber: 1, // 初始化加载第一页，默认第一页
      pageSize: 10, // 每页的记录行数（*）
      queryParams: function queryParams(param) {   // 设置查询参数
        return param;
      },
      strictSearch: true,
      clickToSelect: false, // 是否启用点击选中行
      uniqueId: 'id', // 每一行的唯一标识，一般为主键列
      cardView: false, // 是否显示详细视图
      detailView: false, // 是否显示父子表
      columns: that.columns,
      singleSelect: that.singleSelect ? false : true,
      hideLoading: true,
      loading: false,
      paginationPreText: '上一页',
      paginationNextText: '下一页',
      maintainSelected: that.sidePagination ? true : false, // 默认false，设置为“true”可在翻页时保留所选行。
      onCheckAll: function (row) {
        row.forEach(element => {
          element.isChecked = true;
        });
        that.check.emit(row);
      },
      onUncheckAll: function (row) {
        row.forEach(element => {
          element.isChecked = false;
        });
        that.check.emit(row);
      },
      onCheck: function (row, $element) {
        row.isChecked = true;
        row.index = $element.data('index');
        that.check.emit(row);
      },
      onUncheck: function (row) {
        row.isChecked = false;
        row.index = -1;
        that.check.emit(row);
      },
      responseHandler: function (res) {
        let o = new Object();
        if (res.data instanceof Array) {
          o['total'] = res.data.length;
          o['rows'] = res.data;
        }
        that.dataUpdate.emit({ 'dataList': o['rows'] });
        if (that.sidePagination) {
          return o['rows'];
        } else {
          return o;
        }
      },
    });
  }
}
