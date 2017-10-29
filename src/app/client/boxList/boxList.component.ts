import { Component, Input, EventEmitter, Output, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AppState } from '../../app.service';
import { EmailFolderDialogComponent } from './emailFolderDialog';
import { BoxService } from "../shared/box.service";
import { MdDialog } from '@angular/material';

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

  currentId: any;

  boxName: string;
  boxList: any[];
  user: any;

  boxId: string;
  searchTerm: string;
  params;


  constructor(public appState: AppState,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public dialog: MdDialog,
              public boxService: BoxService) {

    this.params = this.activatedRoute.params.subscribe((params) => {
      console.log('a change Helloo.....');
      console.log(params);
    })


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
    console.log('inside openCreateEmailDialog');
    // const customRoute = this.router.url.match(/(\/box\/|\/search\/)[a-zA-Z\u00C0-\u017F0-9 ]*\//)[0] + 'new';

    this.params = this.activatedRoute.params.subscribe((params) => {
      console.log('another change');
      console.log(params);
    })

    /*
    this.activatedRoute.snapshot.params.subscribe(params => {
      console.log('change');
      console.log(params);
    });
    */

    // this.router.navigate([customRoute]);
  }

  openEmailFolderDialog() {
    let dialogRef = this.dialog.open(EmailFolderDialogComponent, {
      width: '50%',
      height: '50%'
    });
    dialogRef.componentInstance.boxList = this.boxList;
  }

}
