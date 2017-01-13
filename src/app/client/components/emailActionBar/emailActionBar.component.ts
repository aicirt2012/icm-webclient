import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalType } from '../../../shared';

@Component({
  selector: 'email-action-bar',  // <detailedView></detailedView>
  styleUrls: ['./emailActionBar.component.css'],
  templateUrl: './emailActionBar.component.html'
})
export class EmailActionBarComponent {
  @Output() generateEmailResponseActionBar = new EventEmitter<any>();
  @Output() discardEmailResponse = new EventEmitter<any>();
  @Input() responseStatus: boolean;

  constructor() {
  }

  replyEmail() {
    console.log('actionBar');
    this.generateEmailResponseActionBar.emit(ModalType.reply);
  }

  forwardEmail() {
    this.generateEmailResponseActionBar.emit(ModalType.forward);
  }

  emitDiscardEmailResponse() {
    this.discardEmailResponse.emit();
  }

}
