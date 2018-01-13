import { Component } from '@angular/core';
import { ContextTabComponent } from '../contextTab/contextTab.component';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../app.service';
import { Email } from '../shared/email.model';

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
  currentTab: string = 'tasks';
  personSearchTerm: string;
  translationSearchTerm: string;
  wikipediaSearchTerm: string;

  constructor(public route: ActivatedRoute,
              private appState: AppState) {
  }

  ngOnInit() {
    this.appState.currentEmail().subscribe((email) => {
      this.email = email;
    })
  }

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

}
