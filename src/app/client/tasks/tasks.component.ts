import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Email } from '../shared';
import { TaskService } from '../shared';
import { TaskDialogType, DialogType} from '../../shared/constants';
import { TaskDialogComponent } from '../taskDialog';
import { LinkTaskDialogComponent } from '../linkTaskDialog';
import { AppState } from '../../app.service';

@Component({
  selector: 'tasks',  // <taskList></taskList>
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  public errorTrello = false;
  public boards: any;
  public user: any;
  public suggestedTasks: any = [];
  public linkedTasks: any = [];
  private dialogConfig = {
    width: "70%",
    height: '70%',
  }
  private linkTaskDialogConfig = {
    width: '60%',
    height: '40%'
  }

  constructor(private _taskService: TaskService, public dialog: MdDialog, public snackBar: MdSnackBar, public appState: AppState) {
  }

  ngOnChanges() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    this.appState.set('suggestedTasks', this.suggestedTasks);
    this.appState.set('linkedTasks', this.linkedTasks);
    this.user = this.appState.get('user');
    if (this.user.trello) {
      this.getAllBoards();
    }
    else {
      this.errorTrello = true;
    }
  }

  createTask(taskObject: any) {
    this._taskService.createTask(this.email, taskObject)
      .subscribe((task: any) => {
        this.snackBar.open('Task successfully created.', 'OK');
      },
      error => {
        console.log(error);
        this.snackBar.open('Error while creating task.', 'OK');
      },
      () => { });
  }

  getAllBoards() {
    this._taskService.getAllBoards()
      .subscribe((data: any) => {
        this.boards = data;
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
    taskDialogRef.componentInstance.email = this.email;
    taskDialogRef.componentInstance.boards = this.boards;
  }

  deleteTask(task: any) {
    if (task.taskType == 'suggested') {
      this.suggestedTasks.splice(task.index, 1);
      this.appState.set('suggestedTasks', this.suggestedTasks);
    }
    else {
      this.linkedTasks.splice(task.index, 1);
      this.appState.set('linkedTasks', this.linkedTasks);
    }
  }

  openLinkTaskDialog(task: any) {
    let linkTaskDialogRef: MdDialogRef<LinkTaskDialogComponent> = this.dialog.open(LinkTaskDialogComponent, this.linkTaskDialogConfig);
    linkTaskDialogRef.componentInstance.task = task;
    linkTaskDialogRef.componentInstance.email = this.email;
    linkTaskDialogRef.componentInstance.boards = this.boards;
  }

}
