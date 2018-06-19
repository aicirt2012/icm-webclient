import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'task-dialog',
  styleUrls: ['./taskDialog.component.css'],
  templateUrl: './taskDialog.component.html'
})

export class TaskDialogComponent {

  public task: any;
  public suggestedData: any[] = [];
  public isSuggestion: boolean = false;

  private title: string = "(Untitled Task)";
  private provider: string = "";
  private dueDate: string;
  private members: any[] = [];
  private state: string;


  constructor(public taskDialogRef: MatDialogRef<TaskDialogComponent>) {
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
