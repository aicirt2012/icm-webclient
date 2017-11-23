import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ContextTabComponent } from '../contextTab/contextTab.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../../app.service';
import { Email } from '../shared/email.model';

@Component({
  selector: 'context',
  styleUrls: ['./context.component.css'],
  templateUrl: './context.component.html'
})

export class ContextComponent {

  email: Email;
  currentTab: string = 'tasks';

  constructor(public route: ActivatedRoute,
              private appState: AppState) {
  }

  ngOnInit() {
    this.appState.currentEmail().subscribe((email) => {
      this.email = email;
    })
  }

  openTab(tab: string) {
    this.currentTab = tab;
  }

  isOpenTab(tab: string) {
    return this.currentTab === tab;
  }

}
