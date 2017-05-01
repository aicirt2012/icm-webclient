import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'box-list-item', 
  providers: [],
  styleUrls: ['./boxListItem.component.css'],
  templateUrl: './boxListItem.component.html'
})
export class BoxListItemComponent {
  @Input() item: any;
  simpleDrop: any = null;

  constructor(public router: Router) {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

}
