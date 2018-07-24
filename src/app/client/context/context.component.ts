import { Component } from '@angular/core';
import { ContextTabComponent } from '../contextTab/contextTab.component';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../app.service';
import { Email } from '../shared';

@Component({
  selector: 'context',
  styleUrls: ['./context.component.css'],
  templateUrl: './context.component.html',
  host:
    {
      '(document:OnLookupPersonClick)': 'handlePersonSearchEvent($event)',
      '(document:OnLookupTranslationClick)': 'handleTranslationSearchEvent($event)',
      '(document:OnLookupWikipediaClick)': 'handleWikipediaSearchEvent($event)',
    }
})

export class ContextComponent {

  email: Email;
  isTaskProviderEnabled: boolean;
  currentTab: string = 'tasks';
  personSearchTerm: string;
  translationSearchTerm: string;
  wikipediaSearchTerm: string;

  constructor(public route: ActivatedRoute,
              private appState: AppState) {
  }

  ngOnInit() {
    this.email = this.appState.getCurrentEmail();
    this.appState.currentEmail().subscribe((email) => {
      this.email = email;
    });
    this.isTaskProviderEnabled = ContextComponent.calculateIsTaskProviderEnabled(this.appState.getUser());
    console.log("task provider enabled: " + this.isTaskProviderEnabled);
    this.appState.user().subscribe((user) => {
      this.isTaskProviderEnabled = ContextComponent.calculateIsTaskProviderEnabled(user);
      console.log("task provider enabled: " + this.isTaskProviderEnabled);
    });
  }

  // TODO add a way for setting search terms from within the bars to allow for remembering the last searched term

  handlePersonSearchEvent(event: CustomEvent) {
    if (!this.isTabOpen("network"))
      this.openTab("network");
    this.personSearchTerm = event.detail;
  }

  handleTranslationSearchEvent(event: CustomEvent) {
    if (!this.isTabOpen("translate"))
      this.openTab("translate");
    this.translationSearchTerm = event.detail;
  }

  handleWikipediaSearchEvent(event: CustomEvent) {
    if (!this.isTabOpen("wiki"))
      this.openTab("wiki");
    this.wikipediaSearchTerm = event.detail;
  }

  openTab(tab: string) {
    this.currentTab = tab;
  }

  isTabOpen(tab: string) {
    return this.currentTab === tab;
  }

  static calculateIsTaskProviderEnabled(user) {
    if (user && user.taskProviders)
      return (<any>Object).values(user.taskProviders).some((provider) => {
        return provider.isEnabled;
      });
    return false;
  }

}
