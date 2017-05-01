import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContextMenuService, ContextMenuComponent } from '../lib';

@Component({
  selector: 'box-list-item', 
  providers: [],
  styleUrls: ['./boxListItem.component.css'],
  templateUrl: './boxListItem.component.html'
})
export class BoxListItemComponent {
  @Input() item: any;

  constructor(public router: Router) {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

}
