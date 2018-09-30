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
    // TODO init suggestions from email.suggestedData
    if (this.suggestedTasks.length == 0) {
      if (this.user.taskProviders.trello.isEnabled)
        this.suggestedTasks.push({provider: "trello"});
      if (this.user.taskProviders.sociocortex.isEnabled)
        this.suggestedTasks.push({provider: "sociocortex"});
    }
  }

  private refreshTask(taskId: string): void {
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
