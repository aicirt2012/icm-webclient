import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Email } from '../shared';
import { TaskService } from '../shared';
import { TaskDialogType, DialogType} from '../../shared/constants';
import { TaskDialogComponent } from '../taskDialog';
import { AppState } from '../../app.service';

@Component({
  selector: 'tasks',  // <taskList></taskList>
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  @Input() user: any;
  public errorTrello = false;
  public boards: any;
  public suggestedTasks: any = [];
  public linkedTasks: any = [];
  private dialogConfig = {
    width: "70%",
    height: '70%'
  }

  constructor(private _taskService: TaskService, public dialog: MdDialog, public snackBar: MdSnackBar, public appState: AppState) {
  }

  ngOnChanges() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    this.appState.set('suggestedTasks', this.suggestedTasks);
    this.appState.set('linkedTasks', this.linkedTasks);
    if (this.user.trello) this.getAllBoards();
    else this.errorTrello = true;
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
    taskDialogRef.componentInstance.email = this.email;
    taskDialogRef.componentInstance.boards = this.boards;
    taskDialogRef.afterClosed().subscribe(result => {
    });
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

}
