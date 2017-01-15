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
  @Output() onEmailListScrolling = new EventEmitter<any>();

  page = 0;
  limit = 10;
  scrollDistance = 2;
  scrollThrottle = 300;

  constructor(public router: Router) {
    this.page = 0;
  }

  isActive(route:string): boolean {
    return this.router.isActive(route, false);
  }

  isRead(email) {
    return email.flags.indexOf('\\Seen') > -1;
  }

  onScroll() {
    this.page += 1;
    const params = {
      box: this.emails[0].box.name,
      page: this.page,
      limit: this.limit
    };
    this.onEmailListScrolling.emit(params);
  }

}
