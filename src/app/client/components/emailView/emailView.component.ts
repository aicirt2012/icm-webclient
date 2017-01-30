import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../shared';

@Component({
  selector: 'email-view',
  styleUrls: ['./emailView.component.css'],
  templateUrl: './emailView.component.html'
})
export class EmailViewComponent {
  @Input() email: Email;
  @Output() highlightSentence: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  highlight(id: any, highlight: boolean) {
    this.highlightSentence.emit({id: id,highlight: highlight})
  }

}
