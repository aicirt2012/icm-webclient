import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../../../models';

@Component({
  selector: 'list-item',  // <list></list>
  providers: [
  ],
  styleUrls: ['./listItem.component.css'],
  templateUrl: './listItem.component.html'
})

export class ListItemComponent {
  @Input() email: Email;
  constructor() {
  }
}
