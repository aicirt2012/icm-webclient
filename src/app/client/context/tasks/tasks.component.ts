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
      if (this.email)
        this.refreshSuggestedTasks();
    });
  }

  // noinspection JSUnusedGlobalSymbols (method is called by angular)
  ngOnChanges() {
    if (this.email) {
      console.log("Got an updated email via onChange", this.email);
      this.refreshLinkedTasks();
    }
    if (this.email && this.user) {
      console.log("Got an updated email and user via onChange");
      this.refreshSuggestedTasks();
    }
  }

  private refreshLinkedTasks() {
    this.openTasks = [];
    this.completedTasks = [];
    if (this.email.linkedTasks)
      this.email.linkedTasks.forEach(task => {
        this.refreshTask(task._id);
      });
  }

  private refreshSuggestedTasks() {
    this.suggestedTasks = [];
    const task: any = {};
    if (this.email.suggestedData) {
      if (this.email.suggestedData.titles)
        task.title = this.email.suggestedData.titles[0];
    }
    if (this.user.taskProviders.trello.isEnabled) {
      const trelloTask = JSON.parse(JSON.stringify(task));
      trelloTask.provider = "trello";
      this.suggestedTasks.push(trelloTask);
    }
    if (this.user.taskProviders.sociocortex.isEnabled) {
      const sociocortexTask = JSON.parse(JSON.stringify(task));
      sociocortexTask.provider = "sociocortex";
      this.suggestedTasks.push(sociocortexTask);
    }
  }

  private refreshTask(taskId: string): void {
    this.taskService.readTask(taskId)
      .take(1)
      .subscribe(task => {
        if (task.isOpen) {
          const index = this._getTaskIndex(this.openTasks, task);
          if (index !== -1)
            this.openTasks[index] = task;
          else
            this.openTasks.push(task);
        } else {
          const index = this._getTaskIndex(this.completedTasks, task);
          if (index !== -1)
            this.completedTasks[index] = task;
          else
            this.completedTasks.push(task);
        }
      });
  }

  private _getTaskIndex(list: any[], task: any) {
    let index = -1;
    list.some((aTask, i) => {
      if (aTask._id === task._id) {
        index = i;
        return true;
      }
      return false;
    });
    return index;
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
      else if (result && result._id)
        this.refreshTask(result._id);
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
        this.refreshTask(result._id);
    });
  }

}
