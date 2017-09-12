import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from "../../../app.service";
import {ContextMenuComponent} from 'ngx-contextmenu';
import {MdDialog, MdDialogRef} from "@angular/material";
import {BoxDialogComponent} from '../boxListItem/boxDialog/boxDialog.component';

@Component({
  selector: 'box-list-item',
  providers: [],
  styleUrls: ['./boxListItem.component.css'],
  templateUrl: './boxListItem.component.html'
})
export class BoxListItemComponent {

  @Input() item: any;
  @Output() onMoveEmailToBox = new EventEmitter<any>();
  @Output() onMoveBox = new EventEmitter<any>();
  @Output() onRenameBox = new EventEmitter<any>();
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


  constructor(public router: Router, public appState: AppState, public dialog: MdDialog) {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  setCurrentBox() {
    console.log('setting currentBox from BoxListItem...');
    console.log(this.item);
    this.appState.setCurrentBox(this.item);
  }

  renameBox(boxId) {
    console.log('inside renameBox Dialog');
    console.log(boxId);


    let boxDialogRef: MdDialogRef<BoxDialogComponent> = this.dialog.open(BoxDialogComponent,
      {
        width: '25%',
        height: '300px',
        position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
        },
      }
    );

    boxDialogRef.componentInstance.boxId = boxId;
    boxDialogRef.componentInstance.dialogType = 'RENAME';
  }

  moveBox(boxId) {
    console.log('inside moveBox Dialog');
    console.log(boxId);


    let boxDialogRef: MdDialogRef<BoxDialogComponent> = this.dialog.open(BoxDialogComponent,
      {
        width: '25%',
        height: '300px',
        position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
        },
      }
    );

    boxDialogRef.componentInstance.boxId = boxId;
    boxDialogRef.componentInstance.dialogType = 'MOVE';
  }

}
