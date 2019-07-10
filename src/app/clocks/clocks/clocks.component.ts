import { Component, OnInit } from '@angular/core';
// import { $ } from 'protractor';

@Component({
  selector: 'app-clocks',
  templateUrl: './clocks.component.html',
  styleUrls: ['./clocks.component.css']
})
export class ClocksComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    const c = new this.Clock();
    c.run();
  }

  Clock = function () {
    let me = this;
    const config = {
      starCount: 500,
      showFps: true,
      drawDigital: true,
      star: {
        minOpacity: 0.1,
        fade: true,
        fadeSpeed: 0.02,
        color: '#0a0'
      },
      hour: {
        foreground: '#aaa',
        background: '#000',
        width: 3
      },
      minute: {
        foreground: '#aaa',
        background: '#000',
        width: 3
      },
      second: {
        foreground: '#aaa',
        background: '#000',
        width: 3
      },
      milli: {
        foreground: 'rgba(0,0,0,0.1)',
        background: '#000',
        width: 3
      }
    };

    let canvas = document.createElement('canvas');

    let engine = canvas.getContext('2d');

    let frame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (cb) {
      return setTimeout(cb, 30);
    };

    let star = [];
    let size = 0.9;

    let radius = size / 2;

    let current = null;

    let fps = {
      val: 0,
      refresh: 50,
      tick: 0,
      start: new Date()
    };

    let meta = {
      width: 0,
      height: 0,
      size: 0,
      radius: 0,
      middle: {
        x: 0,
        y: 0
      }
    };

  /**
   * init
   */
  this.run = function () {
    generateStar();
    document.body.appendChild(canvas);

    canvas.setAttribute('width', window.innerWidth + '');
    canvas.setAttribute('height', window.innerHeight + '');

    frame(tick);
  };

  /**
   * render frame
   */
  let tick = function () {
    current = new Date();
    solveMeta();

    engine.fillStyle = '#000';
    engine.clearRect(0, 0, meta.width, meta.height);
    engine.fillRect(0, 0, meta.width, meta.height);

    // draw part
    drawFps();
    drawStar();

    drawBackgroundTime();
    drawPattern();
    drawForegroundTime();

    drawDigital();

    frame(tick);
  };

  /**
   * draw digital watch
   */
  let drawDigital = function () {
    if (config.drawDigital) {
      let time = [
        n(current.getHours()),
        current.getSeconds() % 2 ? ':' : ' ',
        n(current.getMinutes())
      ].join('');

      let size = 30;
      // let padding = 10;
      engine.font = size + 'px Arial';
      let m = engine.measureText(time);

      engine.fillStyle = '#fff';
      engine.fillText(
        time,
        meta.middle.x - m.width / 2,
        meta.middle.y + size / 2
      );
    }
  };

  let n = function (ne) {
    if (ne < 10) {
      return '0' + ne;
    }

    return ne;
  };

  /**
   * draw lines for evers hour and minute
   */
  let drawPattern = function () {
    // #1
    engine.strokeStyle = 'rgba(255,255,255,0.2)';
    engine.lineWidth = 2;

    engine.beginPath();
    engine.arc(
      meta.middle.x,
      meta.middle.y,
      meta.radius * 0.8 - meta.radius / 12,
      0,
      Math.PI * 2
    );
    engine.stroke();
    engine.closePath();

    // #1.5
    engine.strokeStyle = 'rgba(255,255,255,0.2)';
    engine.beginPath();
    engine.arc(
      meta.middle.x,
      meta.middle.y,
      meta.radius * 0.8 + meta.radius / 12,
      0,
      Math.PI * 2
    );
    engine.stroke();
    engine.closePath();

    // #2
    engine.strokeStyle = 'rgba(0,0,0,0.5)';
    engine.lineWidth = meta.radius / 6;

    engine.beginPath();
    engine.arc(
      meta.middle.x,
      meta.middle.y,
      meta.radius * 0.8,
      0,
      Math.PI * 2
    );
    engine.stroke();
    engine.closePath();

    let angleWidth = (Math.PI * 2) / 60;
    let seconds = current.getSeconds() + current.getMilliseconds() / 1000;

    for (let i = 0; i < 60; i++) {
      const angleMid = i * angleWidth - 0.5 * Math.PI;
      const startAngle = angleMid - Math.PI / 500;
      const endAngle = angleMid + Math.PI / 500;

      if (i === parseInt(seconds, 0 )) {
        engine.strokeStyle = '#0a0';
      } else {
        let opa = 1 - Math.min( Math.abs(i - 60 - seconds), Math.abs(i - seconds), Math.abs(i + 60 - seconds)) / 15;
        engine.strokeStyle = 'rgba(' + [255, 255, 255, opa].join(',') + ')';
      }
      engine.lineWidth = meta.radius / 20;
      engine.beginPath();
      engine.arc(
        meta.middle.x,
        meta.middle.y,
        meta.radius * 0.8,
        startAngle,
        endAngle
      );
      engine.stroke();
      engine.closePath();
    }

    angleWidth = (Math.PI * 2) / 12;

    for (let i = 0; i < 12; i++) {
      const angleMid = i * angleWidth - 0.5 * Math.PI;
      const startAngle = angleMid - Math.PI / 200;
      const endAngle = angleMid + Math.PI / 200;

      engine.strokeStyle = 'rgba(255,255,255,0.6)';
      engine.lineWidth = meta.radius / 7;

      engine.beginPath();
      engine.arc(
        meta.middle.x,
        meta.middle.y,
        meta.radius * 0.75,
        startAngle,
        endAngle
      );
      engine.stroke();
      engine.closePath();
    }
  };

  /**
   * draw background clock
   */
  let drawBackgroundTime = function () {
    drawBackgroundTimePart( meta.radius / 3 + 20, current.getHours() + current.getMinutes() / 60, 12, config.hour);
    drawBackgroundTimePart( meta.radius * 0.65 + 20, current.getMinutes() + current.getSeconds() / 60, 60, config.minute);
    drawBackgroundTimePart( meta.radius + 20, current.getSeconds() + current.getMilliseconds() / 1000, 60, config.second);
  };

  /**
   * draw foreground clock
   */
  let drawForegroundTime = function () {
    drawTimePart( meta.radius / 3, current.getHours() + current.getMinutes() / 60, 12, config.hour);
    drawTimePart(meta.radius * 0.65, current.getMinutes() + current.getSeconds() / 60, 60, config.minute);
    drawTimePart(meta.radius, current.getSeconds() + current.getMilliseconds() / 1000, 60, config.second);
    drawTimePart(meta.radius / 15, current.getMilliseconds(), 1000, config.milli, true);
    drawTimePart(meta.radius / 15, current.getMilliseconds() + 250, 1000, config.milli, true);
    drawTimePart(meta.radius / 15, current.getMilliseconds() + 500, 1000, config.milli, true);
    drawTimePart(meta.radius / 15, current.getMilliseconds() + 750, 1000, config.milli, true);
  };

  /**
   * draw bg time part
   *
   *  {number} radius
   *  {number} time
   *  {number} maxTime
   *  {{}} config
   */
  let drawBackgroundTimePart = function (rad, time, maxTime, configParam) {
    engine.globalAlpha = 0.5;

    const angleWidth = (Math.PI * 2) / maxTime;
    const angleMid = time * angleWidth - 0.5 * Math.PI;
    const startAngle = angleMid - Math.PI / 1.5;
    const endAngle = angleMid + Math.PI / 1.5;

    engine.fillStyle = configParam.background;

    // ### 1
    let grd = engine.createRadialGradient(
      meta.middle.x,
      meta.middle.y,
      rad / 2,
      meta.middle.x,
      meta.middle.y,
      rad
    );
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, configParam.background);
    engine.fillStyle = grd;

    engine.beginPath();
    engine.moveTo(meta.middle.x, meta.middle.y);
    engine.arc(meta.middle.x, meta.middle.y, rad, startAngle, endAngle);
    engine.fill();
    engine.closePath();

    // ### 2
    grd = engine.createRadialGradient(
      meta.middle.x,
      meta.middle.y,
      rad / 2,
      meta.middle.x,
      meta.middle.y,
      rad
    );
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, 'rgba(0,200,0,0.5)');
    engine.fillStyle = grd;

    engine.beginPath();
    engine.moveTo(meta.middle.x, meta.middle.y);
    engine.arc(
      meta.middle.x,
      meta.middle.y,
      rad,
      startAngle + Math.PI / 2,
      endAngle - Math.PI / 2
    );
    engine.fill();
    engine.closePath();

    engine.globalAlpha = 1;
  };

  /**
   * draw time part
   *
   *  {number} radius
   *  {number} time
   *  {number} maxTime
   *  {{}} config
   */
  let drawTimePart = function ( rad, time, maxTime, configParam, anti?) {
    const angleWidth = (Math.PI * 2) / maxTime;
    let angleMid = time * angleWidth - 0.5 * Math.PI;
    let length = 8;

    if (anti) {
      angleMid = 0 - angleMid;
      length = 8;
    }

    const startAngle = angleMid - Math.PI / length;
    const endAngle = angleMid + Math.PI / length;

    engine.strokeStyle = configParam.foreground;
    engine.lineWidth = configParam.width;

    engine.beginPath();
    engine.arc(
      meta.middle.x,
      meta.middle.y,
      rad - configParam.width,
      startAngle,
      endAngle
    );
    engine.stroke();
    engine.closePath();

    if (!anti) {
      engine.strokeStyle = '#fff';
      engine.lineWidth = 20;

      engine.beginPath();
      engine.arc(
        meta.middle.x,
        meta.middle.y,
        rad,
        angleMid - 0.01,
        angleMid + 0.01
      );
      engine.stroke();
      engine.closePath();
    }
  };

  /**
   * solve and render fps
   */
  let drawFps = function () {
    if (config.showFps) {
      fps.tick--;

      if (fps.tick <= 0) {
        let curr = new Date();
        let diffTime = (Number(curr) - Number(fps.start)) / 1000;
        fps.val = fps.refresh / diffTime;
        fps.start = new Date();
        fps.tick = fps.refresh;
      }

      engine.font = '10px Arial';
      engine.fillStyle = '#fff';
      engine.fillText(
        fps.val +
        ' fps | ' +
        [
          n(current.getHours()),
          current.getSeconds() % 2 ? ':' : ' ',
          n(current.getMinutes()),
          current.getSeconds() % 2 ? ':' : ' ',
          n(current.getSeconds())
        ].join(''),
        5,
        meta.height - 5
      );
    }
  };

  /**
   * generate Star line setup
   */
  let generateStar = function () {
    for (let i = 0; i < config.starCount; i++) {
      star.push({
        width: Math.random(),
        deg: Math.random() * 360,
        color: Math.random(),
        colorDir:
          Math.random() < 0.5
            ? config.star.fadeSpeed
            : -config.star.fadeSpeed
      });
    }
  };

  /**
   * height of canvas
   *  {string}
   */
  let width = function () {
    return canvas.getAttribute('width');
  };

  /**
   * height of canvas
   *  {string}
   */
  let height = function () {
    return canvas.getAttribute('height');
  };

  /**
   * get mid coords from the clock
   *  {{x: number, y: number}}
   */
  let middle = function () {
    return { x: Number(width()) / 2, y: Number(height()) / 2 };
  };

  /**
   * cache size properties
   */
  let solveMeta = function () {
    meta.width = Number(width());
    meta.height = Number(height());
    meta.radius = Math.min(meta.width, meta.height) * radius;
    meta.size = Math.min(meta.width, meta.height);
    meta.middle = middle();
  };

  /**
   * draw clock star lines
   */
  let drawStar = function () {
    engine.strokeStyle = config.star.color;

    for (let i = 0; i < star.length; i++) {
      let starLine = star[i];
      const relX = Math.sin((starLine.deg / 360) * Math.PI * 2);
      const relY = Math.cos((starLine.deg / 360) * Math.PI * 2);

      engine.beginPath();

      engine.moveTo(meta.middle.x, meta.middle.y);

      engine.lineTo(
        meta.middle.x + relX * starLine.width * meta.radius,
        meta.middle.y + relY * starLine.width * meta.radius
      );

      engine.lineWidth = Number((1 - starLine.width) * 5);

      if (config.star.fade) {
        engine.globalAlpha =
          config.star.minOpacity +
          (1 - config.star.minOpacity) * starLine.color;
        starLine.color += starLine.colorDir;

        if (starLine.color >= 1 || starLine.color <= 0) {
          starLine.color = starLine.color + 0;
          starLine.colorDir = -starLine.colorDir;
        }
      }

      engine.stroke();
      engine.closePath();
    }

    engine.globalAlpha = 1;
  };
};
}
