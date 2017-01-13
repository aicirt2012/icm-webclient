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

  constructor(public taskDialogRef: MdDialogRef<TaskDialogComponent>, private snackBar: MdSnackBar, private _taskService: TaskService) {
  }

  ngOnInit() {
  }

  createTask() {
    this._taskService.createTask(this.email, this.task)
      .subscribe((task: any) => {
        console.log("task has been created");
      },
      error => {
        console.log(error);
      },
      () => {});
  }

  updateTask() {
    this._taskService.updateTask(this.task)
      .subscribe((task: any) => {
        console.log("task has been created");
      },
      error => {
        console.log(error);
      },
      () => {});
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
