import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Email } from '../../shared';

@Component({
  selector: 'email-action-bar',  // <detailedView></detailedView>
  styleUrls: ['./emailActionBar.component.css'],
  templateUrl: './emailActionBar.component.html'
})
export class EmailActionBarComponent {
  @Input() boxList: any[];
  @Input() email: Email;
  @Output() onEmailMoveToBox = new EventEmitter<any>();
  @Output() onAddFlags = new EventEmitter<any>();
  @Output() onDeleteFlags = new EventEmitter<any>();
  @Output() generateEmailResponseActionBar = new EventEmitter<any>();
  @Output() discardEmailResponse = new EventEmitter<any>();
  @Input() responseStatus: boolean;

  constructor() {
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
      if(destBox == 'Trash') {
          destBox = this.boxList.find((b) => b.shortName == destBox).name;
      }
      const params = {
          msgId: this.email.uid,
          srcBox: this.email.box.name,
          destBox: destBox
      };
      this.onEmailMoveToBox.emit(params);
  }

  addFlags(flags:string[]) {
      const params = {email: this.email, flags:flags, box:this.email.box.name};
      this.onAddFlags.emit(params);
  }

  deleteFlags(flags:string[]) {
      const params = {email: this.email, flags:flags, box:this.email.box.name};
      this.onDeleteFlags.emit(params);
  }

  isRead() {
      return this.email.flags.indexOf('\\Seen') > -1;
  }

}
