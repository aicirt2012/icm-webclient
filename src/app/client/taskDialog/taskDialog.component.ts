import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DialogType } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { Email, EmailForm } from '../shared';
import { MdDialogRef, MdSnackBar, MdInput } from '@angular/material';

@Component({
  selector: 'task-dialog',
  styleUrls: ['./TaskDialog.component.css'],
  templateUrl: './TaskDialog.component.html'
})
export class TaskDialogComponent {

  public task: any = {};

  constructor(public TaskDialogRef: MdDialogRef<TaskDialogComponent>, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    console.log(this.task);
  }

  closeDialog() {
    this.TaskDialogRef.close();
  }

  addAddress(address: MdInput, addressType: string): void {
    if (address.value && address.value.trim() != '') {
      // this.emailForm[addressType].push(address.value.trim());
      // address.value = '';
    }
  }

  deleteAddress(index: number, addressType: string) {
    if(index > -1) {
      // this.emailForm[addressType].splice(index,1);
    }
  }

}
