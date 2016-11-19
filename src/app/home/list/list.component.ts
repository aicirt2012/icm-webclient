import { Component } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../models/email.model';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'list',  // <list></list>
  providers: [
  ],
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html'
})

export class ListComponent {

  public emails: Email[];
  /* todo: Define type/class for boxes */
  public boxes: any;

  constructor(private emailService: EmailService) {
  }

  /* todo: use Email class instead of any in .subscribe */
  ngOnInit() {
    console.log('hello `list` component');
    /* Default --> load inbox mails */
    this.emailService
      .getAllMailsInbox()
      .subscribe((data: any) => this.emails = data,
      error => console.log(error),
      () => console.log("Inbox mails successfully loaded"));
  }

  public loadInboxEmails(): void {
    console.log('loading inbox mails folder');
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
    console.log(data);
    this.emails = data;
    console.log(this.emails);
  }

  public loadBoxes(): void {
    console.log("loading boxes");
    this.emailService
      .getAllBoxes()
      .subscribe((data: any) => this.boxes = data,
      error => console.log(error),
      () => console.log("Boxes successfully loaded"));
  }

}
