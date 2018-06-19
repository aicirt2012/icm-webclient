import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { AppState } from '../../../app.service';
import { NewTaskDialogComponent } from "./newTaskDialog";
import { EditTaskDialogComponent } from "./editTaskDialog";
import { TaskService } from "../../shared";

@Component({
  selector: 'tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  openTasks: any[] = [];
  completedTasks: any[] = [];
  suggestedTasks: any[] = [];

  private user: any;

  constructor(public appState: AppState,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.appState.user().subscribe(user => {
      this.user = user;
    });
    this.appState.currentEmail().subscribe(email => {
      console.log(this.email);
      this.email = email;
      this.openTasks = [];
      this.completedTasks = [];
      this.suggestedTasks = [];
      this.email.linkedTasks.forEach(task => {
        if (TaskService.isTaskCompleted(task))
          this.completedTasks.push(task);
        else
          this.openTasks.push(task);
        // TODO initialize suggested tasks from email.suggestedData
      });
    });
  }

  getEnabledProviderCount(): number {
    let enabledProviderCount = 0;
    if (this.user && this.user.taskProviders)
      Object.keys(this.user.taskProviders).forEach((provider) => {
        if (this.user.taskProviders[provider].isEnabled)
          enabledProviderCount++;
      });
    return enabledProviderCount;
  }

  openNewTaskDialog(task: any) {
    let dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '30%',
      height: 'auto'
    });
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.isSuggestion = true;  // TODO obsolete, remove property!
    dialogRef.componentInstance.suggestedData = this.email.suggestedData;
  }

  openEditTaskDialog(task: any) {
    let dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '30%',
      height: 'auto'
    });
    dialogRef.componentInstance.task = task;
  }

}
