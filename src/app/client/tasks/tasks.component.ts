import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Email } from '../shared';
import { TaskService } from '../shared';
import { TaskDialogType, DialogType} from '../../shared/constants';
import { TaskDialogComponent } from '../taskDialog';

@Component({
  selector: 'tasks',  // <taskList></taskList>
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  public boards: any;
  public suggestedTasks: any = [];
  public linkedTasks: any = [];
  private dialogConfig = {
    width:"70%",
    height:'70%'
  }

  constructor(private _taskService: TaskService, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    this.getAllBoards();
  }

  createTask(taskObject: any) {
    this._taskService.createTask(this.email, taskObject)
      .subscribe((task: any) => {
        console.log("task has been created");
      },
      error => {
        console.log(error);
      },
      () => {});
  }

  getAllBoards() {
    this._taskService.getAllBoards()
    .subscribe((data: any) => {
      this.boards = data;
      console.log(this.boards);
    },
    error => {
      console.log(error)
    },
    () => {
    console.log("all boards success")
    });
  }

  openDialog(task: any) {
    let taskDialogRef: MdDialogRef<TaskDialogComponent> = this.dialog.open(TaskDialogComponent, this.dialogConfig);
    taskDialogRef.componentInstance.task = task;
  }

}
