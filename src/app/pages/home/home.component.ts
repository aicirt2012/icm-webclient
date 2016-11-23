import { Component, ViewChild } from '@angular/core';
import { AppState } from '../../app.service';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../models';
import { EmailService } from '../../services';

@Component({
  selector: 'home',  // <home></home>
  providers: [
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public emails: Email[] = [];
  public loading: boolean = true;
  private currentBox: string = '';

  constructor(private emailService: EmailService, public appState: AppState) {
  }

  ngOnInit() {
    console.log('hello `list` component');
    this.loading = true;
    this.emailService
      .getEmails(['INBOX'])
      .subscribe((data: any[]) => { this.emails = data[0]; this.loading = false; },
      error => {
        console.log(error)
      },
      () => { console.log("Inbox mails successfully loaded") });
  }

  onRefresh(refresh: boolean) {
    console.log(`refresh...let's wait for 2 seconds...`);
  }

  getEmailBox(box?: string) {
    this.currentBox = box;
    this.emailService
      .getEmails([box])
      .subscribe((data: any[]) => { this.emails = data[0]; },
      error => {
        console.log(error)
      },
      () => { console.log("Inbox mails successfully loaded") });
  }

}
