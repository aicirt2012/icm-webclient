import { Component, Input, EventEmitter, Output, ViewChild, state } from '@angular/core';
import { Email } from '../shared';
import { EmailService } from '../shared';
import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../../app.service';

@Component({
  selector: 'email-detailed-view',
  styleUrls: ['./emailDetailedView.component.css'],
  templateUrl: './emailDetailedView.component.html'
})
export class EmailDetailedViewComponent {
  currentBox: string;
  email: Email;
  emails: Email[];
  currentId: any;
  boxList: any[];
  public responseStatus: boolean;
  private emailResponse: any;
  private sending = false;
  private manuallyRemovedFlag = false;
  private moving = false;

  constructor(private _emailService: EmailService, public snackBar: MdSnackBar,
    public route: ActivatedRoute, public appState: AppState, public router: Router) {
    this.emailResponse = {};
    this.responseStatus = false;
  }

  ngOnInit() {
    
    this.emails = this.appState.get('emails').length > 0 ? this.appState.get('emails') : [];
    this.boxList = this.appState.get('boxList').length > 0 ? this.appState.get('boxList') : [];
    

    this.appState.dataChange.subscribe((stateChange) => {
      this[stateChange] = this.appState.get(stateChange);

      if(this.emails.length > 0 && this.boxList.length > 0 && this.email && this.email.flags && !(this.email.flags.indexOf('\\Seen') > -1) && !this.manuallyRemovedFlag) {
        this.addFlags(['\\Seen']);
      }
      
    });

    this.currentId = this.route.params.map(params => params['emailId'] || 'None');
    this.currentId.subscribe((emailId) => {
      emailId === 'None' ? '' : this.getSingleMail(emailId);
    });
  }

  generateEmailResponse(type: string) {
    this.responseStatus = true;
    this.emailResponse = this._emailService.generateEmailForm(this.email, type);
  }

  discardEmailResponse() {
    this.responseStatus = false;
    this.emailResponse = {};
  }

  sendEmail(mail: any) {
    this.sending = true;
    this._emailService
      .sendMail(mail)
      .subscribe((data: any) => {
        this.sending = false;
        this.snackBar.open('Message successfully sent.', 'OK');
        this.responseStatus = false;
      }, (error) => {
        this.sending = false;
        this.snackBar.open('Error while sending.', 'OK');
      });
  }

  getSingleMail(id: string) {
    this._emailService
      .getSingleMail(id)
      .subscribe((data: any) => {
        this.appState.set('email', data);
      },
      error => {
        console.log(error)
      },
      () => {
        console.log(`Message with ID: ${id} has been successfully loaded`)
      });
  }

  emailMoveToBox(params: any) {
    this.moving = true;
    this._emailService.moveMail(params.msgId, params.srcBox, params.destBox).subscribe((res) => {
      this.emails.splice(this.emails.findIndex((e)=>this.email._id==e._id),1);
      this.emails.length > 0 ? this.appState.set('emails', this.emails) : this.appState.set('emails', []);
      this.snackBar.open(`Message successfully moved to ${params.destBox}.`, 'OK');
      this.router.navigate([`box/${this.appState.get('currentBox')}`]);
      this.moving = false;
    }, (err) => {
      console.log(err);
      this.snackBar.open('Message successfully moved.', 'OK');
      this.moving = false;
    });
  }

  addFlags(flags: string[]) {
    const oldEmail = this.appState.get('email');
    const oldEmails = this.appState.get('emails');
    const oldBoxList = this.appState.get('boxList');

    this.email.flags = this.email.flags.concat(flags);
    this.emails = this.emails.map((email) => {
      if (this.email._id == email._id) {
        email.flags = this.email.flags;
      }
      return email;
    });
    this.boxList = this.boxList.map((box) => {
      if (box.name == this.email.box.name) {
        box.unseen -= 1;
      }
      return box;
    });
    this.appState.set('email', this.email);
    this.appState.set('boxList', this.boxList);
    this.appState.set('emails', this.emails);

    this._emailService.addFlags(this.email.uid, flags, this.email.box.name).subscribe((res) => { }, (err) => {
      this.appState.set('email', oldEmail);
      this.appState.set('emails', oldEmails);
      this.appState.set('boxList', oldBoxList);
      this.snackBar.open('Error while setting email to READ.', 'OK');
    }, () => {
    });
  }

  deleteFlags(flags: string[]) {
    const oldEmail = this.appState.get('email');
    const oldEmails = this.appState.get('emails');
    const oldBoxList = this.appState.get('boxList');
    this.manuallyRemovedFlag = true;

    flags.forEach((f) => {
      this.email.flags.splice(this.email.flags.indexOf(f), 1);
    });
    this.emails.map((email) => {
      if (this.email._id == email._id) {
        email.flags = this.email.flags;
      }
      return email;
    });
    this.boxList.map((box) => {
      if (box.name == this.email.box.name) {
        box.unseen += 1;
      }
      return box;
    });
    this.appState.set('email', this.email);
    this.appState.set('boxList', this.boxList);
    this.appState.set('emails', this.emails);

    this._emailService.delFlags(this.email.uid, flags, this.email.box.name).subscribe((res) => {
      this.manuallyRemovedFlag = false;
    }, (err) => {
      this.appState.set('email', oldEmail);
      this.appState.set('emails', oldEmails);
      this.appState.set('boxList', oldBoxList);
      this.snackBar.open('Error while setting email to READ.', 'OK');
      this.manuallyRemovedFlag = false;
    }, () => {
    });
  }

}
