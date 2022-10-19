import { Component, ViewChild } from '@angular/core';
import {CountdownComponent} from 'ngx-countdown';
@Component({
  selector: 'my-app',
  template: `
  <countdown #cd  [config]="{leftTime: timeData, demand: true, notify: [ 2, 5 ]}" (event)="handleEvent($event)"></countdown>
  <button (click)="pause(cd, 0)">pause</button>
   <button (click)="start(cd, 0)">start</button>
   <br/><br/>
    <countdown #cd2  [config]="{leftTime: timeData2, demand: true, notify: [ 2, 5 ]}" (event)="handleEvent($event)"></countdown>
  <button (click)="pause(cd2, 0)">pause</button>
   <button (click)="start(cd2, 0)">start</button>
  `
})
export class AppComponent  {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  timeData = "100"
  timeData2 = "120"
  constructor(){

  }

  handleEvent(event){
    if(event.action === 'notify'){
      console.log('Hi!');
      this.timeData = "0";
    }
  }

  pause(comp: CountdownComponent){
    comp.pause();
  }

  start(comp: CountdownComponent){
    comp.begin();
  }
}
