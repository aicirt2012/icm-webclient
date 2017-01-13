import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalType } from '../../../shared';
import { Email } from '../../shared';
import { EmailService } from '../../shared';
import { MdSnackBar } from '@angular/material';

/* TODO: refactor to smart component EmailDetailedView */
@Component({
  selector: 'detailed-view',  // <detailedView></detailedView>
  styleUrls: ['./detailedView.component.css'],
  templateUrl: './detailedView.component.html'
})
export class DetailedViewComponent {

  @Input() email: Email;
  private emailResponse: any;
  private sending = false;
  public responseStatus: boolean;

  constructor(private _emailService: EmailService, public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    console.log('hello `DetailedViewComponent` component');
    this.emailResponse = {};
    this.responseStatus = false;
  }

  generateEmailResponse(type:any) {
    this.responseStatus = true;
    this.emailResponse = this._emailService.generateEmailForm(this.email, type);
  }

  discardEmailResponse() {
    this.responseStatus = false;
    this.emailResponse = {};
  }

  sendEmail(mail:any) {
    this.sending=true;
    this._emailService
      .sendMail(mail)
      .subscribe((data: any) => {
        this.sending=false;
        this.snackBar.open('Message successfully sent.', 'OK');
      }, (error) => {
        this.sending=false;
        this.snackBar.open('Error while sending.', 'OK');
      });
  }

}
