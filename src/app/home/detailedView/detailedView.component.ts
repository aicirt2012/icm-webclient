import { Component } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';


@Component({
  selector: 'detailedView',  // <detailedView></detailedView>
  styleUrls: ['./detailedView.component.css'],
  templateUrl: './detailedView.component.html'
})
export class DetailedViewComponent {
  // Set our default values
  // TypeScript public modifiers
  constructor() {
    //some random stuff

  }
  ngOnInit() {
    console.log('hello `DetailedViewComponent` component');
  }
}
