import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MdDialogRef, MdSnackBar, MdInput} from '@angular/material';
import {BoxService} from '../../../shared';
import {AppState} from '../../../../app.service';


@Component({
  selector: 'box-dialog',
  styleUrls: ['./boxDialog.component.css'],
  templateUrl: './boxDialog.component.html'
})
export class BoxDialogComponent {

  public box: any;
  public boxId: any;
  public boxList: any = {};
  private selectedBoxName: string = '';
  private newBoxShortName: string = '';

  constructor(public taskDialogRef: MdDialogRef<BoxDialogComponent>,
              private snackBar: MdSnackBar,
              private boxService: BoxService, public appState: AppState) {
  }

  ngOnInit() {
    this.box = this.appState.getBox(this.boxId);
    console.log(this.box);
  }

  onRenameBox() {
    const oldBoxId = this.boxList.find((box) => box.name == this.selectedBoxName)._id;
    this.boxService.renameBox(oldBoxId, this.newBoxShortName).subscribe((msg) => {
      console.log('inside onRenameBox');
      this.snackBar.open(`Folder '${this.selectedBoxName}' successfully renamed.`, 'OK');
      this.newBoxShortName = '';
      this.closeDialog();
    }, (err) => {
      console.log(err);
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
