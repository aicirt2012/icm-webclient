import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material";
import { AppState } from '../../../app.service';
import { TaskDialogComponent } from "./taskDialog";
import { TaskService } from '../../shared';

@Component({
  selector: 'tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() enabled: boolean;
  @Input() email: any;
  openTasks: any[] = [];
  completedTasks: any[] = [];
  suggestedTasks: any[] = [];

  private user: any;

  constructor(public appState: AppState,
              private taskService: TaskService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.user = this.appState.getUser();
    this.appState.user().subscribe(user => {
      this.user = user;
    });
  }

  // noinspection JSUnusedGlobalSymbols (method is called by angular)
  ngOnChanges() {
    if (this.email) {
      console.log("Got an updated email via onChange:");
      console.log(this.email);
      this.openTasks = [];
      this.completedTasks = [];
      this.suggestedTasks = [];
      if (this.email.linkedTasks)
        this.email.linkedTasks.forEach(task => {
          // load each task from our backend via its id
          this.updateTask(task._id);
          // TODO initialize suggested tasks from email.suggestedData
        });
    }
  }

  private updateTask(taskId: string): void {
    this.taskService.readTask(taskId)
      .take(1)
      .subscribe(task => {
        this.removeFromTaskLists(task);
        if (task.isOpen)
          this.openTasks.push(task);
        else
          this.completedTasks.push(task);
      });
  }

  private removeFromTaskLists(task: any): void {
    this.openTasks = this.openTasks.filter(openTask => openTask._id !== task._id);
    this.completedTasks = this.completedTasks.filter(completedTask => completedTask._id !== task._id);
  }

  openNewTaskDialog(task: any) {
    let dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '45%',
      height: 'auto'
    });
    dialogRef.componentInstance.onPostConstruct(task, this.email, this.user, false);
    dialogRef.afterClosed().subscribe(result => {
      if (result === null)
        this.removeFromTaskLists(task);
      else if (result)
        this.updateTask(result._id);
    });
  }

  openEditTaskDialog(task: any) {
    let dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '45%',
      height: 'auto'
    });
    dialogRef.componentInstance.onPostConstruct(task, this.email, this.user, true);
    dialogRef.afterClosed().subscribe(result => {
      if (result === null)
        this.removeFromTaskLists(task);
      else if (result)
        this.updateTask(result._id);
    });
  }

}
