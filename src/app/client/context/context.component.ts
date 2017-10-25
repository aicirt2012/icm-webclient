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

  constructor(public route: ActivatedRoute, private emailService: EmailService) {
  }

  ngOnInit() {
    this.currentId = this.route.params.map(params => params['emailId'] || 'None');
    this.currentId.subscribe((emailId) => {
      console.log('get single email...');
      if (emailId !== 'None') {
        this.getSingleMail(emailId);
      }
    });
  }

  openTab(tab: string) {
    this.currentTab = tab;
  }

  isOpenTab(tab: string) {
    return this.currentTab === tab;
  }

  private getSingleMail(emailId: string) {
    this.emailService.getEmail(emailId)
      .subscribe((data: any) => {
          if (data.sentences) {
            data.sentences = data.sentences.map((s) => {
              s.highlighted = false;
              return s
            });
          }
          this.email = data;
          if (this.email.flags.indexOf('\\Seen') == -1) {
            // this.addFlags(['\\Seen']);
          }

        },
        error => {
          console.log(error)
        },
        () => {
          console.log(`Message with ID: ${emailId} has been successfully loaded`)
        });
  }

}
