import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
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

  constructor(private _taskService: TaskService, public dialog: MdDialog, public snackBar: MdSnackBar) {
  }

  /*ngOnInit() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    this.getAllBoards();
  }*/

  ngOnChanges() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    this.getAllBoards();
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
    taskDialogRef.componentInstance.email = this.email;
    taskDialogRef.componentInstance.boards = this.boards;
  }

  deleteTask(task: any) {
    console.log("deleting task in tasks");
    console.log(task);
    if(task.taskType == "suggested") {
      /* search by desc in suggestedTasks because there is not yet any ID for a suggested Task */
      /* we have to find a way to identify suggestedTasks better */
      let position = 0;
      for(let index = 0; index < this.suggestedTasks.length; index++) {
        if(this.suggestedTasks[index].desc == task.desc) position = index;
      }
      this.suggestedTasks.splice(position, 1);
    }
    else {
    //let found = this.suggestedTasks.filter((obj) => { if(obj.desc == task.desc) return obj});
    }
  }

}
