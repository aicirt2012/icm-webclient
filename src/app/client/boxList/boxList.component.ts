import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '../../app.service';
import {EmailFolderDialogComponent} from './emailFolderDialog';
import {BoxService} from "../shared/box.service";
import {MdDialog, MdDialogRef} from '@angular/material';
import {BoxDialogComponent} from './boxListItem/boxDialog/boxDialog.component';
// import {EmailDialogComponent} from '../emailDialog';
// import {DialogType} from '../../shared/constants';
// import {EmailService} from '../shared';

@Component({
  selector: 'box-list',
  providers: [],
  styleUrls: ['./boxList.component.css'],
  templateUrl: './boxList.component.html'
})
export class BoxListComponent {
  private navbarItems: any[] = [];
  @Input() lastSync: Date;
  @Input() syncing: Boolean;
  @Output() onRefresh = new EventEmitter<boolean>();
  @Output() onMoveEmailToBox = new EventEmitter<any>();

  boxName: string;
  boxList: any[];
  user: any;

  constructor(public appState: AppState,
              public router: Router,
              public dialog: MdDialog,
              public boxService: BoxService) {
  }

  ngOnInit() {
    this.appState.boxList().subscribe(boxList => {
      if (boxList.length > 0) {
        this.boxList = boxList;
        this.addDataToBoxes(boxList);
        const currentBoxURL = this.router.url.match(/(\/box\/)([a-zA-Z\u00C0-\u017F0-9 ]*)/);

        if (currentBoxURL !== null) {
          const currentBoxId = currentBoxURL[2];
          const currentBox = boxList.find(x => x._id === currentBoxId);
          this.appState.setCurrentBox(currentBox);

        } else if (this.router.url == '/box') {
          this.appState.setCurrentBox(boxList[0]);
          this.router.navigate(['box/' + boxList[0]._id]);
        }

      }
    });

    this.appState.user().subscribe(user => {
      this.user = user;
    });
  }

  moveEmailToBox(data) {
    console.log('recursive event emit to parent');
    this.onMoveEmailToBox.emit(data);
  }

  private addDataToBoxes(boxList: any[]) {
    if (boxList.length > 0) {

      boxList = this.boxService.addDefaultBoxes(boxList);
      const boxParentMap = this.getBoxParentMap(boxList);
      const rootBoxes = boxParentMap.get(null);
      this.navbarItems = this.populateBoxesTree(rootBoxes, boxParentMap);
    }
  }

  private getBoxParentMap(boxList: any): Map<string, any> {
    const boxParentMap = new Map<string, any>();
    boxList.forEach(box => {
      if (boxParentMap.has(box.parent))
        boxParentMap.get(box.parent).push(box);
      else
        boxParentMap.set(box.parent, [box]);
    });
    return boxParentMap;
  }

  private populateBoxesTree(boxes: any[], boxParentMap) {
    if (boxes == null)
      return [];
    return boxes.map(box => {
      if (boxParentMap.has(box._id)) {
        let children = boxParentMap.get(box._id);
        box.children = this.populateBoxesTree(children, boxParentMap);
      }
      return box;
    });
  }

  renameBox(id) {
    console.log('inside renameBox Dialog');
    console.log(id);

    let boxDialogRef: MdDialogRef<BoxDialogComponent> = this.dialog.open(BoxDialogComponent,
      {
        width: '25%',
        height: '50%',
        position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
        }
      });
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  openCreateEmailDialog() {
    console.log('inside openCreateEmailDialog');
    const customRoute = this.router.url.match(/(\/box\/|\/search\/)[a-zA-Z\u00C0-\u017F0-9 ]*\//)[0] + 'new';
    this.router.navigate([customRoute]);
    /*
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
    */
  }

  openEmailFolderDialog() {
    let dialogRef = this.dialog.open(EmailFolderDialogComponent, {
      width: '50%',
      height: '50%'
    });
    dialogRef.componentInstance.boxList = this.boxList;
  }

}
