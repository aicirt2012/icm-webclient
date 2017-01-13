import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalType } from '../../../shared';
import { Email } from '../../shared';

@Component({
  selector: 'email-action-bar',  // <detailedView></detailedView>
  styleUrls: ['./emailActionBar.component.css'],
  templateUrl: './emailActionBar.component.html'
})
export class EmailActionBarComponent {
  private actionBoxItems: any[] = [];
  @Input() openModal: EventEmitter<any>;
  @Input() boxList: any[];
  @Input() email: Email;
  @Input() onEmailDelete: EventEmitter<any>;
  @Input() onEmailMoveToBox: EventEmitter<any>;

  constructor() {
    this.actionBoxItems = this.boxList;
  }

  openReplyEmailModal() {
    this.openModal.emit(ModalType.reply);
  }

  openForwardEmailModal() {
    this.openModal.emit(ModalType.forward);
  }

  deleteEmail() {
    this.onEmailDelete.emit(this.email.messageId);
  }

  moveEmailToBox(boxName: string) {
    //this.onEmailMoveToBox.emit([this.email.messageId, this.email.box, boxName]);
  }

}
