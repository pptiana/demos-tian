import { Component, OnInit } from '@angular/core';
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';

@Component({
  selector: 'app-websssh',
  templateUrl: './websssh.component.html',
  styleUrls: ['./websssh.component.css']
})
export class WebssshComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let xterm = new Terminal();
    xterm.open(document.getElementById('terminal'));
    xterm.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
  }

}
