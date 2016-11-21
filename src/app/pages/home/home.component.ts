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

  constructor(private emailService: EmailService, public appState: AppState) {
  }

  /* todo: use Email class instead of any in .subscribe */
  ngOnInit() {
    console.log('hello `list` component');
    this.loading = true;
    this.emailService
      .getEmails()
      .subscribe((data: Email[]) => { this.emails = data; this.loading = false; },
      error => {
        console.log(error)
      },
      () => { console.log("Inbox mails successfully loaded") });
  }

  onRefresh(refresh: boolean) {
    console.log('refresh!');
    this.emails = [];
    setTimeout(() => {
      this.emailService
        .getEmails()
        .subscribe((data: Email[]) => { this.emails = data },
        error => {
          console.log(error)
        },
        () => { console.log("Inbox mails successfully loaded") });
    }, 2000);
  }

  public loadInboxEmails(): void {
    console.log('loading inbox mails folder');
    console.log(this.emails);
    this.emailService
      .getAllMailsInbox()
      .subscribe((data: any) => this.emails = data,
      error => console.log(error),
      () => console.log("Inbox mails successfully loaded"));
  }

  public loadSentEmails(): void {
    console.log('loading sent mails folder');
    this.emailService
      .getAllMailsSend()
      .subscribe((data: any) => this.emails = data,
      error => console.log(error),
      () => console.log("Send mails successfully loaded"));
  }

  public loadDraftEmails(): void {
    console.log('loading draft mails folder');
    this.emailService
      .getAllMailsDraft()
      .subscribe((data: any) => this.emails = data,
      error => console.log(error),
      () => console.log("Draft mails successfully loaded"));
  }

  public loadTrashEmails(): void {
    console.log('loading trash mails folder');
    this.emailService
      .getAllMailsTrash()
      .subscribe((data: any) => this.OnDataUpdate(data),
      error => console.log(error),
      () => console.log("success"));
  }

  public OnDataUpdate: any = (data: any): void => {
    this.emails = data;
  }

  // public loadBoxes(): void {
  //   console.log("loading boxes");
  //   this.emailService
  //     .getAllBoxes()
  //     .subscribe((data: any) => this.boxes = data,
  //     error => console.log(error),
  //     () => console.log("Boxes successfully loaded"));
  // }
}
