import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../../../models';

@Component({
  selector: 'list',  // <list></list>
  providers: [
  ],
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html'
})

export class ListComponent {
  @Input() emails: Email[];
  constructor() {
  }
}
