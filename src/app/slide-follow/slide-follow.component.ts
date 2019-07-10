import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slide-follow',
  templateUrl: './slide-follow.component.html',
  styleUrls: ['./slide-follow.component.css']
})
export class SlideFollowComponent implements OnInit {
  @Input()
  time = 50;
  @Input()
  slideData: Array<any> = [];
  @Input()
  slideWidth: any = '300px';
  @Input()
  slideHeight: any = '200px';

  public myTimer: any;

  constructor() { }

  ngOnInit() {
    this.slideData = [{
      context: '第一行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第二行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第三行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第四行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第五行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第六行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第七行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第八行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第九行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第十行文字',
      iconClass: 'fa-bullhorn'
    }, {
      context: '第十一行文字',
      iconClass: 'fa-bullhorn'
    }];
    this.myTimer = setInterval(this.scrollUp, this.time);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    window.onresize = () => { }; //防止内存泄漏
    clearInterval(this.myTimer);
  }

  scrollUp = function () {
    let area = document.getElementById('scrollBox');
    let con1 = document.getElementById('con1');
    if (area.scrollTop >= con1.offsetHeight) {
      area.scrollTop = 0;
    } else {
      area.scrollTop++;
    }
  };

  mouseOverFn() {
    clearInterval(this.myTimer);
  }

  mouseOutFn() {
    this.myTimer = setInterval(this.scrollUp, this.time);
  }

}
