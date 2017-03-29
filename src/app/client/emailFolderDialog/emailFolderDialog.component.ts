import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {MdDialogRef, MdSnackBar, MdInput} from '@angular/material';
import {EmailService} from '../shared';
import {AppState} from '../../app.service';


@Component({
  selector: 'email-folder-dialog',
  styleUrls: ['./EmailFolderDialog.component.css'],
  templateUrl: './EmailFolderDialog.component.html'
})
export class EmailFolderDialogComponent {

  public boxList: any = {};
  public boxList$: any = {};
  private updating: boolean = false;
  public refreshBoxList: any;
  private selectedBoxName: string = '';
  private newBoxName: string = '';
  private newBoxShortName: string = '';
  private parentBox: string = '';

  constructor(public taskDialogRef: MdDialogRef<EmailFolderDialogComponent>, private snackBar: MdSnackBar, private _emailService: EmailService, public appState: AppState) {
  }

  ngOnInit() {
    this.boxList$ = this.appState.dataChange.subscribe((res) => {
      console.log(res);
      this.boxList = this.appState.get('boxList');
    });
  }

  onAddBox() {
    this.updating = true;
    let parentBoxId = 'NONE';
    if (this.parentBox != '') {
      console.log('inside onAddBox...');
      console.log(this.boxList);
      console.log(this.parentBox);
      parentBoxId = this.boxList.find((box) => box.name == this.parentBox)._id;
    }
    this._emailService.addBox(this.newBoxName, parentBoxId).subscribe((msg) => {
      this.updating = false;
      this.parentBox = '';
      this.snackBar.open(`New box '${this.newBoxName}' was successfully created.`, 'OK');
      this.newBoxName = '';
      this.closeDialog();
    }, (err) => {
      console.log(err);
      this.updating = false;
      this.snackBar.open('Error while creating new box.', 'OK');
    });
  }

  onDeleteBox() {
    this.updating = true;
    const boxId = this.boxList.find((box) => box.name == this.selectedBoxName)._id;
    this._emailService.delBox(boxId).subscribe((msg) => {
      console.log('inside onDeleteBox');
      this.updating = false;
      this.snackBar.open(`Folder '${this.selectedBoxName}' successfully deleted.`, 'OK');
      this.selectedBoxName = '';
      this.closeDialog();
    }, (err) => {
      console.log(err);
      this.updating = false;
      this.snackBar.open('Error while deleting folder.', 'OK');
    });
  }

  onRenameBox() {
    this.updating = true;
    const oldBoxId = this.boxList.find((box) => box.name == this.selectedBoxName)._id;
    this._emailService.renameBox(oldBoxId, this.newBoxShortName).subscribe((msg) => {
      console.log('inside onDeleteBox');
      this.updating = false;
      this.snackBar.open(`Folder '${this.selectedBoxName}' successfully renamed.`, 'OK');
      this.selectedBoxName = '';
      this.newBoxShortName = '';
      this.closeDialog();
    }, (err) => {
      console.log(err);
      this.updating = false;
      this.snackBar.open('Error while renaming folder.', 'OK');
    });
  }

  addPadding(box: any) {
    let paddingLeft = `0`;
    if (box.level > 0) {
      paddingLeft = `${box.level * 5}px`;
    }
    return paddingLeft;
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
