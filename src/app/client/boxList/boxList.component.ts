import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogType} from '../../shared/constants';
import {AppState} from '../../app.service';
import {EmailDialogComponent} from '../emailDialog';
import {EmailFolderDialogComponent} from './emailFolderDialog';
import {EmailService} from '../shared';

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

  boxName: string;
  boxList: any[];
  user: any;

  constructor(public appState: AppState, public router: Router, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.appState.boxList().subscribe(boxList=>{
      if(boxList.length > 0){
        this.boxList = boxList;
        this.addDataToBoxes(boxList);
        if(this.router.url == '/box'){
          this.appState.setCurrentBox(boxList[0]);
          this.router.navigate(['box/'+boxList[0]._id]);
        }       
      }
    });

    this.appState.user().subscribe(user=>{      
      this.user = user;
    });
  }

  private addDataToBoxes(boxList: any[]) {
    if (boxList.length > 0) {
      boxList = boxList.map((box) => {
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
        box.icon = icon;
        box.children = [];
        return box;
      });

      const boxParentMap = this.getBoxParentMap(boxList);
      const rootBoxes = boxParentMap.get(null);
      this.navbarItems = this.populateBoxesTree(rootBoxes, boxParentMap);
    }
  }

  private getBoxParentMap(boxList: any): Map<string,any>{
    const boxParentMap = new Map<string,any>();
    boxList.forEach(box => {
      if(boxParentMap.has(box.parent))
        boxParentMap.get(box.parent).push(box);
      else
        boxParentMap.set(box.parent, [box]);
    });
    return boxParentMap;
  }

  private populateBoxesTree(boxes: any[], boxParentMap) {
    if(boxes == null)
      return [];
    return boxes.map(box => {
      if(boxParentMap.has(box._id)) {
        let children = boxParentMap.get(box._id);
        box.children = this.populateBoxesTree(children, boxParentMap);
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
