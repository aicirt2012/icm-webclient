import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'new-task-dialog',
  styleUrls: ['./newTaskDialog.component.css'],
  templateUrl: './newTaskDialog.component.html'
})

export class NewTaskDialogComponent {

  public task: any;
  public suggestedData: any[] = [];
  public isSuggestion: boolean = false;

  private title: string = "(Untitled Task)";
  private provider: string = "";
  private dueDate: string;
  private members: any[] = [];
  private state: string;


  constructor(public taskDialogRef: MatDialogRef<NewTaskDialogComponent>) {
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
