import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {MatDialogRef, MatSnackBar, MatInput} from '@angular/material';
import {BoxService} from '../../shared';
import {AppState} from '../../../app.service';


@Component({
  selector: 'email-folder-dialog',
  styleUrls: ['./emailFolderDialog.component.css'],
  templateUrl: './emailFolderDialog.component.html'
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

  constructor(public taskDialogRef: MatDialogRef<EmailFolderDialogComponent>, private snackBar: MatSnackBar, private boxService: BoxService, public appState: AppState) {
  }

  ngOnInit() {
    this.boxList$ = this.appState.boxList().subscribe(boxList => {
      this.boxList = boxList;
    });
  }

  onAddBox() {
    this.updating = true;
    let parentBoxId = 'NONE';
    if (this.parentBox != '') {
      parentBoxId = this.boxList.find((box) => box.shortName == this.parentBox)._id;
    }
    this.boxService.addBox(this.newBoxName, parentBoxId).subscribe((msg) => {
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
