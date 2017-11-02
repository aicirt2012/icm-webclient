import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ContextTabComponent } from '../contextTab/contextTab.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmailService } from '../shared/email.service';
import { AppState } from '../../app.service';

@Component({
  selector: 'context',
  styleUrls: ['./context.component.css'],
  templateUrl: './context.component.html'
})

export class ContextComponent {

  // @Input() email: any;
  currentId: any;
  email: any;
  currentTab: string = 'tasks';

  constructor(public route: ActivatedRoute,
              private emailService: EmailService,
              private appState: AppState) {
  }

  ngOnInit() {
    this.currentId = this.route.params.map(params => params['emailId'] || 'NONE');
    this.currentId.subscribe((emailId) => {
      console.log('get single email from context...');
      if (emailId !== 'NONE') {
        this.email = this.appState.getCurrentEmail();
        console.log(this.email);
      }
    });
  }

  openTab(tab: string) {
    this.currentTab = tab;
  }

  isOpenTab(tab: string) {
    return this.currentTab === tab;
  }

}
