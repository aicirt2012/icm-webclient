import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'edit-task-dialog',
  styleUrls: ['./editTaskDialog.component.css'],
  templateUrl: './editTaskDialog.component.html'
})

export class EditTaskDialogComponent {

  public task: any;

  private title: string = "(Untitled Task)";
  private provider: string = "";
  private dueDate: string;
  private members: any[] = [];
  private state: string;

  constructor(public taskDialogRef: MatDialogRef<EditTaskDialogComponent>) {
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
