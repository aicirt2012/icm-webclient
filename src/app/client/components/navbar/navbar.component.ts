import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalType } from '../../../shared/constants';
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
  @Output() onRefresh = new EventEmitter<boolean>();
  @Output() openModal = new EventEmitter<any>();
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
            icon = 'glyphicon glyphicon-home';
            break;
          case 'Sent Mail':
            icon = 'glyphicon glyphicon-share-alt';
            break;
          case 'Drafts':
            icon = 'glyphicon glyphicon-file';
            break;
          case 'Starred':
            icon = 'glyphicon glyphicon-star';
            break;
          case 'Spam':
            icon = 'glyphicon glyphicon-warning-sign';
            break;
          case 'Trash':
            icon = 'glyphicon glyphicon-trash';
            break;
          default:
            icon = 'glyphicon glyphicon-home';
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

  openCreateEmailModal() {
    this.openModal.emit(ModalType.create);
  }

}
