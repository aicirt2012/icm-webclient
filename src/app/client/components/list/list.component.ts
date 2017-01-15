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
  @Output() searchEmailBox = new EventEmitter<string>();
  scrollDistance = 2;
  scrollThrottle = 200;

  constructor(public router: Router) {
  }

  isActive(route:string): boolean {
    return this.router.isActive(route, false);
  }

  isRead(email) {
    return email.flags.indexOf('\\Seen') > -1;
  }

  onScrollDown () {
    console.log('scrolled!!');
  }

}
