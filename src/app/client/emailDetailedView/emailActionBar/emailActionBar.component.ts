import { EmailDialogComponent } from './../../emailDialog/emailDialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Email } from '../../shared';
import { AppState } from '../../../app.service';

@Component({
  selector: 'email-action-bar',
  styleUrls: ['./emailActionBar.component.css'],
  templateUrl: './emailActionBar.component.html'
})
export class EmailActionBarComponent {
  @Input() boxList: any[];
  @Input() email: Email;
  @Output() onEmailMoveToTrash = new EventEmitter<any>();
  @Output() onEmailMoveToBox = new EventEmitter<any>();
  @Output() onAddFlags = new EventEmitter<any>();
  @Output() onDeleteFlags = new EventEmitter<any>();
  @Output() generateEmailResponseActionBar = new EventEmitter<any>();
  @Output() discardEmailResponse = new EventEmitter<any>();
  @Input() responseStatus: boolean;

  constructor(public dialog: MatDialog, private appState: AppState) {
  }

  replyEmail() {
    this.generateEmailResponseActionBar.emit('reply');
  }

  forwardEmail() {
    this.generateEmailResponseActionBar.emit('forward');
  }

  emitDiscardEmailResponse() {
    this.discardEmailResponse.emit();
  }

  moveEmailToBox(destBox: string) {
    const params = {
      emailId: this.email._id,
      newBoxId: this.boxList.find((b) => b.shortName == destBox)._id
    };
    this.onEmailMoveToBox.emit(params);
  }

  moveEmailToTrash() {
    this.onEmailMoveToTrash.emit(this.email._id);
  }

  addFlags(flags: string[]) {
    this.onAddFlags.emit(flags);
  }

  deleteFlags(flags: string[]) {
    this.onDeleteFlags.emit(flags);
  }

  showMailActions() {
    const currentBox = this.appState.getCurrentBox();
    return currentBox.shortName != 'Drafts' &&  currentBox.shortName != 'Sent Mails';
  }

  // TODO: Use detailed emailview edit instead of dialog
  editEmail() {
    let emailDialogRef: MatDialogRef<EmailDialogComponent> = this.dialog.open(EmailDialogComponent, {
      width: '80%',
      height: '95%',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    });
    emailDialogRef.componentInstance.emailForm = {
      to: this.email.to ? this.email.to.map((t) => `${t.name}<${t.address}>`) : [],
      cc: this.email.cc ? this.email.cc.map((t) => `${t.name}<${t.address}>`) : [],
      bcc: this.email.bcc ? this.email.bcc.map((t) => `${t.name}<${t.address}>`) : [],
      subject: this.email.subject,
      text: this.email.text
    };
  }

  toggleHighlightAnnotations() {
    this.email['highlightAnnotations'] = !this.email['highlightAnnotations'];
  }

}
