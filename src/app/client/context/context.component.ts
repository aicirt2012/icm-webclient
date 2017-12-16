import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ContextTabComponent } from '../contextTab/contextTab.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../../app.service';
import { Email } from '../shared/email.model';

@Component({
  selector: 'context',
  styleUrls: ['./context.component.css'],
  templateUrl: './context.component.html',
  host:
    {
      '(document:OnTranslationClick)': 'handleTranslationEvent($event)',
      '(document:OnSearchClick)': 'handleSearchEvent($event)',
    }
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

  handleTranslationEvent(event:CustomEvent) {
    if(!this.isOpenTab("translate"))
      this.openTab("translate");

  }

  handleSearchEvent (event:CustomEvent) {
    if(!this.isOpenTab("wiki"))
      this.openTab("wiki");
  }
  openTab(tab: string) {
    this.currentTab = tab;
  }

  isOpenTab(tab: string) {
    return this.currentTab === tab;
  }

}
