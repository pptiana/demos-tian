import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-clock',
  templateUrl: './simple-clock.component.html',
  styleUrls: ['./simple-clock.component.css']
})
export class SimpleClockComponent implements OnInit {
  public dom;
  public ctx;
  public width;
  public height;
  public r;
  public rem;
  public app: any;
  hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

  constructor() { }

  ngOnInit() {
    this.dom = document.getElementById('clock');
    this.ctx = this.dom.getContext('2d');
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.r = this.width / 2;
    this.rem = this.width / 200;  // 设置缩放时钟时的比例
    this.draw();
  }

  drawBackground() {
    this.ctx.save();
    this.ctx.translate(this.r, this.r);
    this.ctx.beginPath();
    this.ctx.lineWidth = 10 * this.rem;
    this.ctx.arc(0, 0, this.r - this.ctx.lineWidth, 0, 2 * Math.PI, false);
    this.ctx.stroke();
    this.ctx.font = 18 * this.rem + 'px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.hourNumbers.forEach((number, i) => {
      const rad = 2 * Math.PI / 12 * i;
      const x = Math.cos(rad) * (this.r - 30 * this.rem);
      const y = Math.sin(rad) * (this.r - 30 * this.rem);
      this.ctx.fillText(number, x, y);
    });

    for (let i = 0; i < 60; i++) {
      const rad = 2 * Math.PI / 60 * i;
      const x = Math.cos(rad) * (this.r - 18 * this.rem);
      const y = Math.sin(rad) * (this.r - 18 * this.rem);
      this.ctx.beginPath();
      if (i % 5 === 0) {
        this.ctx.fillStyle = '#000';
        this.ctx.arc(x, y, 2 * this.rem, 0, 2 * Math.PI, false);
      } else {
        this.ctx.fillStyle = '#ccc';
        this.ctx.arc(x, y, 2 * this.rem, 0, 2 * Math.PI, false);
      }
      this.ctx.fill();
    }
  }

  drawHour(hour, minute) {
    this.ctx.save();
    this.ctx.beginPath();
    const rad = 2 * Math.PI / 12 * hour;
    const mrad = 2 * Math.PI / 12 / 60 * minute;
    this.ctx.rotate(rad + mrad);
    this.ctx.lineWidth = 6 * this.rem;
    this.ctx.lineCap = 'round';
    this.ctx.moveTo(0, 10 * this.rem);
    this.ctx.lineTo(0, -this.r / 2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawMinute(minute) {
    this.ctx.save();
    this.ctx.beginPath();
    const rad = 2 * Math.PI / 60 * minute;
    this.ctx.rotate(rad);
    this.ctx.lineWidth = 3 * this.rem;
    this.ctx.lineCap = 'round';
    this.ctx.moveTo(0, 10 * this.rem);
    this.ctx.lineTo(0, -this.r + 30 * this.rem);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawSecond(second) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = '#c14543';
    const rad = 2 * Math.PI / 60 * second;
    this.ctx.rotate(rad);
    this.ctx.moveTo(-2 * this.rem, 20 * this.rem);
    this.ctx.lineTo(2 * this.rem, 20 * this.rem);
    this.ctx.lineTo(1, -this.r + 18 * this.rem);
    this.ctx.lineTo(-1, -this.r + 18 * this.rem);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawDot() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#fff';
    this.ctx.arc(0, 0, 3 * this.rem, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    this.drawBackground();
    this.drawHour(hour, minute);
    this.drawMinute(minute);
    this.drawSecond(second);
    this.drawDot();
    this.ctx.restore();
    const that = this;
    this.app = setInterval(function () {
      that.draw();
    }, 1000);
  }

}
