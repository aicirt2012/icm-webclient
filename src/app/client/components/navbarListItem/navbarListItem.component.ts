import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-list-item',  // <navbar></navbar>
  providers: [
  ],
  styleUrls: ['./navbarListItem.component.css'],
  templateUrl: './navbarListItem.component.html'
})
export class NavBarListItemComponent {
  @Input() item: any;

  constructor(public router: Router) {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

}
