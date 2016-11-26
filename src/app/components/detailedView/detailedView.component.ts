import { Component, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../models';

@Component({
  selector: 'detailedView',  // <detailedView></detailedView>
  styleUrls: ['./detailedView.component.css'],
  templateUrl: './detailedView.component.html'
})
export class DetailedViewComponent {

  @Input() email: Email;
  @Input() loadedOnce: boolean;

  constructor() {
  }
  ngOnInit() {
    console.log('hello `DetailedViewComponent` component');
  }
}
