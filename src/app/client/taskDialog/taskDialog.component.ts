import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MdSnackBar, MdInput } from '@angular/material';
import { TaskService } from '../shared';

@Component({
  selector: 'task-dialog',
  styleUrls: ['./TaskDialog.component.css'],
  templateUrl: './TaskDialog.component.html'
})
export class TaskDialogComponent {

  public task: any = {};
  public email: any = {};
  public boards: any[] = [];
  public sending: boolean = false;
  public selectedMembers: any[] = [];
  public possibleMembers: any[] = [];
  public currMember = '';


  constructor(public taskDialogRef: MdDialogRef<TaskDialogComponent>, private snackBar: MdSnackBar, private _taskService: TaskService) {
  }

  ngOnInit() {
    console.log(this.task);
  }

  createTask() {
    this.sending = true;
    this._taskService.createTask(this.email, this.task)
      .subscribe((task: any) => {
        this.sending=false;
        this.snackBar.open('Task successfully created.', 'OK');
        this.closeDialog();
      },
      error => {
        console.log(error);
        this.sending=false;
        this.snackBar.open('Error while creating task.', 'OK');
      },
      () => {});
  }

  updateTask() {
    this._taskService.updateTask(this.task)
      .subscribe((task: any) => {
        this.snackBar.open('Task successfully updated.', 'OK');

      },
      error => {
        console.log(error);
        this.snackBar.open('Error while updating task.', 'OK');

      },
      () => {});
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

  addMember(member: any, index: number): void {
      this.selectedMembers.push(member);
      this.possibleMembers.splice(index,1);
      this.currMember = '';
  }

  deleteMember(member: any, index: number) {
    this.possibleMembers.push(member);
    this.selectedMembers.splice(index,1);
    this.currMember = '';
  }

}
