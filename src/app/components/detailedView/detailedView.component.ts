import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalType } from '../../constants';
import { Email } from '../../models';

@Component({
  selector: 'detailedView',  // <detailedView></detailedView>
  styleUrls: ['./detailedView.component.css'],
  templateUrl: './detailedView.component.html'
})
export class DetailedViewComponent {
  @Output() openModal = new EventEmitter<any>();

  @Input() email: Email;
  @Input() loadedOnce: boolean;

  constructor() {
  }
  ngOnInit() {
    console.log('hello `DetailedViewComponent` component');
  }

  openReplyEmailModal() {
    this.openModal.emit(ModalType.reply);
  }

  openFowardEmailModal() {
    this.openModal.emit(ModalType.forward);
  }

}
