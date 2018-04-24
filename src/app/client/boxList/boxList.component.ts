import { Component, Input, EventEmitter, Output, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../app.service';
import { EmailFolderDialogComponent } from './emailFolderDialog';
import { BoxService } from "../shared/box.service";
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import _ from 'lodash';

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

  boxList: any[];
  user: any;

  boxId: string;
  searchTerm: string;
  params;


  constructor(public appState: AppState,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              public boxService: BoxService) {
  }

  ngOnInit() {
    this.appState.boxList().subscribe(boxList => {
      if (boxList.length > 0) {
        this.boxList = boxList;
        this.addDataToBoxes(boxList);

        const url = this.activatedRoute.url["value"][0].path;
        const outlets = {}

        this.activatedRoute.children.forEach((child) => {
          Object.assign(outlets, child.snapshot.params);
        });

        if (url === 'box' && (_.size(outlets) > 0) && (outlets['boxId'] !== 'NONE')) {
          const currentBox = this.appState.getBox(outlets['boxId']);
          this.appState.setCurrentBox(currentBox);
        } else if (url === 'box') {
          this.appState.setCurrentBox(boxList[0]);
          this.router.navigate(['/box', {outlets: {boxId: [boxList[0]._id]}}]);
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
      this.navbarItems = this.populateBoxesTree(rootBoxes, boxParentMap, 0);
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

  private populateBoxesTree(boxes: any[], boxParentMap, level: number = 0) {
    if (boxes == null)
      return [];
    return boxes.map(box => {
      if (boxParentMap.has(box._id)) {
        let children = boxParentMap.get(box._id);
        box.children = this.populateBoxesTree(children, boxParentMap, level + 1);
      }
      box.level = level;
      return box;
    });
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  createNewEmail() {
    const url = this.activatedRoute.url["value"][0].path;
    const outlets = {}

    this.activatedRoute.children.forEach((child) => {
      Object.assign(outlets, child.snapshot.params);
    });

    outlets['emailId'] = 'new';
    this.router.navigate([url, {outlets}]);
  }

  openEmailFolderDialog() {
    let dialogRef = this.dialog.open(EmailFolderDialogComponent, {
      width: '25%',
      height: '300px',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      },
    });
    dialogRef.componentInstance.boxList = this.boxList;

  }

}
