import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ContextTabComponent } from '../contextTab/contextTab.component';
import { AppState } from '../../app.service';

@Component({
  selector: 'context',
  styleUrls: ['./context.component.css'],
  templateUrl: './context.component.html'
})

export class ContextComponent {

  @Input() email: any;
  currentTab:string = 'tasks';

  constructor() {
  }

  ngOnInit() {
  }

  openTab(tab:string){
    this.currentTab = tab;
  }

  isOpenTab(tab:string){
    return this.currentTab === tab;
  }

}
