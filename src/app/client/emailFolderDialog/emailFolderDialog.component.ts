import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MdSnackBar, MdInput } from '@angular/material';
import { EmailService } from '../shared';
import { AppState } from '../../app.service';


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
    let newBox: string = this.newBoxName;
    if(this.parentBox != '') {
      newBox = `${this.parentBox}/${this.newBoxName}`
    }
    this._emailService.addBox(newBox).subscribe((res) => {
        this._emailService.updateMailboxList().subscribe((res: any[]) => {
          this.appState.set('boxList', res);
          this.updating = false;
          this.parentBox = '';
          this.snackBar.open(`New box '${this.newBoxName}' was successfully created.`, 'OK');
          this.newBoxName = '';
          this.closeDialog();
        }, () => {
           this.updating = false;
           this.snackBar.open('Error while creating new box.', 'OK');
        });
    });
}

  onDeleteBox() {
    this.updating = true;
    this._emailService.delBox(this.selectedBoxName).subscribe((res) => {
        this._emailService.updateMailboxList().subscribe((res: any[]) => {
          this.appState.set('boxList', res);
          this.updating = false;
          this.snackBar.open(`Folder '${this.selectedBoxName}' successfully deleted.`, 'OK');
          this.selectedBoxName = '';
          this.closeDialog();
        }, () => {
           this.updating = false;
           this.snackBar.open('Error while deleting folder.', 'OK');
        });
    });
}

  addPadding(box:any) {
    let paddingLeft = `0`;
    if(box.level > 0) {
      paddingLeft = `${box.level*5}px`;
    }
    return paddingLeft;
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
