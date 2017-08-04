import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from "../../../app.service";
import {ContextMenuComponent} from 'ngx-contextmenu';

@Component({
  selector: 'box-list-item',
  providers: [],
  styleUrls: ['./boxListItem.component.css'],
  templateUrl: './boxListItem.component.html'
})
export class BoxListItemComponent {
  @Input() item: any;
  @Output() onMoveEmailToBox = new EventEmitter<any>();
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  dropEmailEvent(event) {
    console.log(event.dragData);
    this.onMoveEmailToBox.emit({emailId: event.dragData._id, newBoxId: this.item._id});
  }

  moveEmailToBox(data) {
    console.log('recursive event emit to parent');
    console.log(data);
    this.onMoveEmailToBox.emit(data);
  }


  constructor(public router: Router, public appState: AppState) {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  setCurrentBox() {
    console.log('setting currentBox from BoxListItem...');
    console.log(this.item);
    this.appState.setCurrentBox(this.item);
  }

  showMessage(event) {
    console.log(event);
  }

}
