import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogType} from '../../../shared/constants';
import {AppState} from '../../../app.service';
import {EmailDialogComponent} from '../../emailDialog';
import {EmailFolderDialogComponent} from '../../emailFolderDialog';
import {EmailService} from '../../shared';

@Component({
  selector: 'navbar',  // <navbar></navbar>
  providers: [],
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavBarComponent {
  private navbarItems: any[] = [];
  @Input() lastSync: Date;
  @Input() syncing: Boolean;
  @Output() onRefresh = new EventEmitter<boolean>();

  boxName: string;
  boxList: any[];
  user: any;

  constructor(public appState: AppState, public router: Router, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.appState.dataChange.subscribe((stateChange) => {
      if (this.appState.getBoxList().length > 0) {
        this.boxList = this.appState.getBoxList();
        this.addDataToBoxes(this.appState.getBoxList());
      }
      this.user = this.appState.getUser();
    })
  }

  addDataToBoxes(boxList: any[]) {
    if (boxList.length > 0) {
      this.navbarItems = boxList.map((box) => {
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
        }
        ;
        box.route = `/box/${box._id}`;
        box.icon = icon;
        box.children = [];
        return box;
      });

      const boxParentMap = new Map();

      this.navbarItems.forEach(box => {
        if (boxParentMap.has(box.parent)) {
          boxParentMap.get(box.parent).push(box);
        } else {
          boxParentMap.set(box.parent, [box]);
        }
      });

      const rootBoxes = boxParentMap.get(null);

      console.log(boxParentMap);
      console.log(rootBoxes);

      this._populateBoxesTree(rootBoxes, boxParentMap);
    }
  }

  _populateBoxesTree(boxes: any[], boxParentMap) {
    return boxes.map(box => {
      if (boxParentMap.has(box._id)) {
        let children = boxParentMap.get(box._id);
        box.children.push(this._populateBoxesTree(children, boxParentMap));
      }
      return box;
    });
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  openCreateEmailDialog() {
    let emailDialogRef: MdDialogRef<EmailDialogComponent> = this.dialog.open(EmailDialogComponent, {
      width: '80%',
      height: '95%',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    });
  }

  openEmailFolderDialog() {
    let dialogRef = this.dialog.open(EmailFolderDialogComponent, {
      width: '50%',
      height: '50%'
    });
    dialogRef.componentInstance.boxList = this.boxList;
  }

}
