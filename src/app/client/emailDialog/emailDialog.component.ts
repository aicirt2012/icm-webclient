import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmailService } from '../shared';
import { ModalType } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { Email, EmailForm } from '../shared';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'email-dialog',
  styleUrls: ['./emailDialog.component.css'],
  templateUrl: './emailDialog.component.html'
})
export class EmailDialogComponent {

  public emailForm: any = {};
  public cc = false;
  public bcc = false;

  constructor(private _emailService: EmailService, public emailDialogRef: MdDialogRef<EmailDialogComponent>) {
  }

  ngOnInit() {
    console.log('hello `EmailDialogComponent` component');
  }

  showCc() {
    this.cc=!this.cc;
  }
  showBcc() {
    this.bcc=!this.bcc;
  }

  closeDialog() {
    this.emailDialogRef.close();
  }

  sendEmail(mail: any) {
    console.log("sending now ");
    console.log(mail);
    this._emailService
      .sendMail(mail)
      .subscribe((data: any) => {
        this.emailForm = {};
      });
  }

}
