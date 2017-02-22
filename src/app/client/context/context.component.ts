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
  currentTab:string;

  constructor(public appState: AppState) {
  }

  ngOnInit() {
    this.appState.get('user');
  }

  openTab(tab:string){
    console.log(tab)
    this.currentTab = tab;
  }

  isOpenTab(tab:string){
    console.log('isOpenTab '+tab + ' '+ this.currentTab+' '+this.currentTab == tab);
    return this.currentTab === tab;
  }

}
