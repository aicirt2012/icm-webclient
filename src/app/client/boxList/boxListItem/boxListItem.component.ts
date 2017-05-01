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
  @Output() onMoveEmailToBox = new EventEmitter<any>();

  dropEmailEvent(event){
    console.log(event.dragData);
    this.onMoveEmailToBox.emit({emailId: event.dragData._id, newBoxId: this.item._id});
  }

  moveEmailToBox(data){
    console.log('recursive event emit to parent');
    console.log(data);
    this.onMoveEmailToBox.emit(data);
  }


  constructor(public router: Router) {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }


}
