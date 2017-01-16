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
  @Input() user: any;
  public errorTrello = false;
  public boards: any;
  public suggestedTasks: any = [];
  public linkedTasks: any = [];
  private dialogConfig = {
    width:"70%",
    height:'70%'
  }

  constructor(private _taskService: TaskService, public dialog: MdDialog, public snackBar: MdSnackBar) {
  }

  ngOnChanges() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    if(this.user.trello) this.getAllBoards();
    else this.errorTrello = true;
  }

  createTask(taskObject: any) {
    this._taskService.createTask(this.email, taskObject)
      .subscribe((task: any) => {
        this.snackBar.open('Task successfully created.', 'OK');
        //remove taskObject from suggestedTasks
        this.deleteTask(taskObject);
        //add returned task to linked tasks - we have to manually add the task type because we don't fetch the new mail
        this.addLinkedTaskLocally(task, taskObject);
        //now switch to linkedTasks View
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
    let position = 0;
    if(task.taskType == "suggested") {
      /* search by desc in suggestedTasks because there is not yet any ID for a suggested Task */
      /* we have to find a way to identify suggestedTasks better */
      for(let index = 0; index < this.suggestedTasks.length; index++) {
        if(this.suggestedTasks[index].desc == task.desc) position = index;
      }
      this.suggestedTasks.splice(position, 1);
    }
    else {
      for(let index = 0; index < this.linkedTasks.length; index++) {
        if(this.linkedTasks[index].id == task.id) position = index;
      }
      this.linkedTasks.splice(position, 1);
    }
  }

  addLinkedTaskLocally(task: any, suggestedTask: any) {
    task.selectedBoard = suggestedTask.selectedBoard;
    task.selectedMembers = [suggestedTask.selectedMembers];
    task.idList = suggestedTask.idList;
    task.date = suggestedTask.date;
    task.board = task.selectedBoard;
    task.list = task.idList;
    task.members = task.selectedMembers;
    task.taskType = "linked"
    this.linkedTasks.push(task);
  }

}
