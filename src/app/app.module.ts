import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DragComponent } from './drag/drag.component';
import { ThreeJsDemoComponent } from './three-js-demo/three-js-demo.component';
import { WebssshComponent } from './webssh/websssh/websssh.component';
import { ClocksComponent } from './clocks/clocks/clocks.component';
import { SimpleClockComponent } from './clocks/muke/simple-clock/simple-clock.component';
export const ROUTES: Routes = [
  { path: '', component: DragComponent },
  { path: 'three', component: ThreeJsDemoComponent },
  { path: 'gooflow', component: DragComponent },
  { path: 'webssh', component: WebssshComponent },
  { path: 'clock', component: ClocksComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DragComponent,
    ThreeJsDemoComponent,
    WebssshComponent,
    ClocksComponent,
    SimpleClockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
