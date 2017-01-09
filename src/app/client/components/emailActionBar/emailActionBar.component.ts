import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalType } from '../../../shared';

@Component({
  selector: 'email-action-bar',  // <detailedView></detailedView>
  styleUrls: ['./emailActionBar.component.css'],
  templateUrl: './emailActionBar.component.html'
})
export class EmailActionBarComponent {
  private actionBoxItems: any[] = [];
  @Input() openModal: EventEmitter<any>;
  @Input() boxList: any[];

  constructor() {
    this.actionBoxItems = this.boxList;
  }

  openReplyEmailModal() {
    this.openModal.emit(ModalType.reply);
  }

  openForwardEmailModal() {
    this.openModal.emit(ModalType.forward);
  }

  ngOnChanges() {
    this.addDataToBoxes();
  }

  addDataToBoxes() {
    if (this.boxList.length > 0) {
      this.actionBoxItems= this.boxList.map((box) => {
        let icon;
        switch (box.shortName) { //TODO put in service
          case 'INBOX':
            icon = 'home';
            break;
          case 'Sent Mail':
            icon = 'send';
            break;
          case 'Drafts':
            icon = 'drafts';
            break;
          case 'Starred':
            icon = 'star';
            break;
          case 'Spam':
            icon = 'error';
            break;
          case 'Trash':
            icon = 'delete';
            break;
          default:
            icon = 'home';
            break;
        };
        box.route = `/box/${box.id}`;
        box.icon = icon;
        box.children = [];
        return box;
      });
      console.log('filling... ');
      console.log(this.actionBoxItems);
      this._populateBoxesTree(this.actionBoxItems);
    }
  }

  _populateBoxesTree(boxes) {
    let removeableIndices = [];
    boxes.forEach((box, index) => {
      if (box.parent != null) {
        let parent = boxes.filter((b) => b.id == box.parent.id)[0];
        parent.children.push(box);
        removeableIndices.push(index);
      }
    });
    removeableIndices.reverse().forEach((i) => {
      boxes.splice(i, 1);
    });
  }

}
