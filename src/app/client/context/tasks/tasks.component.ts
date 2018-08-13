import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material";
import { AppState } from '../../../app.service';
import { NewTaskDialogComponent } from "./newTaskDialog";
import { EditTaskDialogComponent } from "./editTaskDialog";
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
          this.taskService.readTask(task._id)
            .take(1)
            .subscribe(task => {
              if (task.isOpen)
                this.openTasks.push(task);
              else
                this.completedTasks.push(task);
            });
          // TODO initialize suggested tasks from email.suggestedData
        });
    }
  }

  openNewTaskDialog(task: any) {
    let dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '45%',
      height: 'auto'
    });
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.user = this.user;
    dialogRef.componentInstance.suggestedData = this.email.suggestedData;
  }

  openEditTaskDialog(task: any) {
    let dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '45%',
      height: 'auto'
    });
    dialogRef.componentInstance.task = task;
  }

}
