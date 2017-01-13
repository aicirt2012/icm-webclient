import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalType } from '../../../shared';
import { Email } from '../../shared';

@Component({
  selector: 'detailed-view',  // <detailedView></detailedView>
  styleUrls: ['./detailedView.component.css'],
  templateUrl: './detailedView.component.html'
})
export class DetailedViewComponent {
  @Output() openModal = new EventEmitter<any>();
  @Input() boxList: any[];
  @Output() onEmailDelete = new EventEmitter<any>();
  @Output() onEmailMoveToBox = new EventEmitter<any>();

  @Input() email: Email;

  constructor() {
  }
  ngOnInit() {
    console.log('hello `DetailedViewComponent` component');
  }

}
