import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material";
import { AppState } from '../../../app.service';
import { TaskDialogComponent } from "./taskDialog";

@Component({
  selector: 'tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  suggestedTasks: any[] = [];

  private user: any;

  constructor(public appState: AppState,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.appState.user().subscribe(user => {
      this.user = user;
    });
    // TODO initialize suggested tasks from email.suggestedData
  }

  isAnyProviderEnabled(): boolean {
    if (this.user && this.user.taskProviders)
      Object.keys(this.user.taskProviders).forEach((provider) => {
        if (this.user.taskProviders[provider].isEnabled)
          return true;
      });
    return false;
  }

  openTaskDialog(task: any, isSuggestion: boolean) {
    let dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '25%',
      height: '300px',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      },
    });
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.isSuggestion = isSuggestion;
    dialogRef.componentInstance.suggestedData = this.email.suggestedData;
  }

}
