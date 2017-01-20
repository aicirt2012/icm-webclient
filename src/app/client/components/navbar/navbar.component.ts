import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogType } from '../../../shared/constants';
import { AppState } from '../../../app.service';

@Component({
  selector: 'navbar',  // <navbar></navbar>
  providers: [
  ],
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavBarComponent {
  private navbarItems: any[] = [];
  @Input() boxList: any[];
  @Input() lastSync: Date;
  @Output() onRefresh = new EventEmitter<boolean>();
  @Output() openDialog = new EventEmitter<any>();
  @Output() onOpenEmailFolderDialog = new EventEmitter<any>();
  boxName: string;

  constructor(public appState: AppState, public router: Router) {
    this.navbarItems = this.boxList;
  }

  ngOnChanges() {
    this.addDataToBoxes();
  }

  addDataToBoxes() {
    if (this.boxList.length > 0) {
      this.navbarItems = this.boxList.map((box) => {
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
      this._populateBoxesTree(this.navbarItems);
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

  refresh() {
    this.onRefresh.emit(true);
  }

  openCreateEmailDialog() {
    this.openDialog.emit(DialogType.email);
  }

  openEmailFolderDialog() {
    this.onOpenEmailFolderDialog.emit();
  }

}
