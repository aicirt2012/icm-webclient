import { Component } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';


@Component({
  selector: 'list',  // <list></list>

  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html'
})
export class ListComponent {
  // Set our default values
  // TypeScript public modifiers
  constructor() {
    //some random stuff

  }
  ngOnInit() {
    console.log('hello `list` component');

  }

}
