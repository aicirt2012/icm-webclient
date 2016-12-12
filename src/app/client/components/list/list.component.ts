import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../shared';

@Component({
  selector: 'list',  // <list></list>
  providers: [
  ],
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html'
})

export class ListComponent {
  @Input() emails: Email[];
  constructor(public router: Router) {
  }

  isActive(route:string): boolean {
      /*console.log(route);
      console.log(this.router.isActive(route, false));*/
    return this.router.isActive(route, false);
  }
}
