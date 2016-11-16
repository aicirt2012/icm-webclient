import { Component } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';


@Component({
  selector: 'navbar',  // <navbar></navbar>

  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavBarComponent {
  // Set our default values
  // TypeScript public modifiers
  constructor() {
    //some random stuff

  }
  ngOnInit() {
    console.log('hello `navbar` component');

  }

}
