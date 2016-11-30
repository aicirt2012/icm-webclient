import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalType } from '../../constants';

@Component({
  selector: 'navbar-list-item',
  providers: [
  ],
  styleUrls: ['./navbarListItem.component.css'],
  templateUrl: './navbarListItem.component.html'
})
export class NavBarListItemComponent {
  @Input() item:any;

  constructor() {
  }
  ngOnInit() {
      console.log('item',this.item);
  }
}
