import {Component, Input, EventEmitter, Output, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatInput} from '@angular/material';
import {BoxService} from '../../../shared';
import {AppState} from '../../../../app.service';
import _ from 'lodash';


@Component({
  selector: 'box-dialog',
  styleUrls: ['./boxDialog.component.css'],
  templateUrl: './boxDialog.component.html'
})
export class BoxDialogComponent {

  public box: any;
  public boxId: any;
  public allChildren: any;
  public dialogType: any; // RENAME or MOVE or DELETE
  public boxList: any;
  private newParentBoxId: string = '';
  private newBoxShortName: string = '';

  constructor(public taskDialogRef: MatDialogRef<BoxDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private boxService: BoxService, public appState: AppState) {

    this.boxId = data.boxId;
    this.dialogType = data.dialogType;
  }

  ngOnInit() {
    this.box = this.appState.getBox(this.boxId);
    this.allChildren = this.appState.getAllLevelsChildren(this.boxId);
    this.boxList = this.appState.getBoxList().filter(box =>
      !box.static && box._id != this.boxId &&
      !_.find(this.allChildren, {'_id': box._id})
      ).slice();
    if(this.box.level > 0) {
      this.boxList.unshift({_id: 'ROOT', shortName: 'ROOT'});
    }
  }

  onRenameBox() {
    this.boxService.renameBox(this.boxId, this.newBoxShortName).subscribe((msg) => {
      console.log('inside onRenameBox');
      this.snackBar.open(`Folder '${this.newBoxShortName}' successfully renamed.`, 'OK');
      this.newBoxShortName = '';
      this.closeDialog();
    }, (err) => {
      console.log(err);
      this.snackBar.open('Error while renaming folder.', 'OK');
    });
  }

  onMoveBox() {
    this.boxService.moveBox(this.boxId, this.newParentBoxId).subscribe((msg) => {
      this.snackBar.open(`Folder successfully moved`, 'OK');
      this.newParentBoxId = '';
      this.closeDialog();
    }, (err) => {
      console.log(err);
      this.snackBar.open('Error while moving folder.', 'OK');
    });
  }

  onDeleteBox() {
    this.boxService.deleteBox(this.boxId).subscribe((msg) => {
      this.snackBar.open(`Folder successfully deleted`, 'OK');
      this.closeDialog();
    }, (err) => {
      console.log(err);
      this.snackBar.open('Error while deleting folder.', 'OK');
    });
  }

  addPadding(box: any) {
    let paddingLeft = `0`;
    if (box.level > 0) {
      paddingLeft = `${box.level * 10}px`;
    }
    return paddingLeft;
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
