import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalType } from '../../../shared';

@Component({
  selector: 'email-action-bar',  // <detailedView></detailedView>
  styleUrls: ['./emailActionBar.component.css'],
  templateUrl: './emailActionBar.component.html'
})
export class EmailActionBarComponent {
  @Input() openModal: EventEmitter<any>;

  constructor() {
  }

  openReplyEmailModal() {
    this.openModal.emit(ModalType.reply);
  }

  openForwardEmailModal() {
    this.openModal.emit(ModalType.forward);
  }

}
