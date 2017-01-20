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
    this._emailService.addBox(this.newBoxName).subscribe((res) => {
        this._emailService.updateMailboxList().subscribe((res: any[]) => {
          this.appState.set('boxList', res);
          this.updating = false;
          this.snackBar.open(`New folder '${this.newBoxName}' successfully created.`, 'OK');
        }, () => {
           this.snackBar.open('Error while creating new folder.', 'OK');
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
        }, () => {
           this.updating = false;
           this.snackBar.open('Error while deleting folder.', 'OK');
        });
    });
}

  closeDialog() {
    this.taskDialogRef.close();
  }

}
