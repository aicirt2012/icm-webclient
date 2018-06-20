import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { TaskService } from "../../../shared";

@Component({
  selector: 'edit-task-dialog',
  styleUrls: ['./editTaskDialog.component.css'],
  templateUrl: './editTaskDialog.component.html'
})

export class EditTaskDialogComponent {

  public task: any;

  private title: string;
  private provider: string;
  private dueDateRaw: any;
  private dueDate: string;

  private trelloData: any;
  private sacmData: any;

  constructor(public taskDialogRef: MatDialogRef<EditTaskDialogComponent>) {
  }

  ngOnInit() {
    this.title = TaskService.getParameter(this.task, 'name');
    this.provider = this.task.provider;
    this.dueDateRaw = TaskService.getParameter(this.task, 'due');

    if (this.dueDateRaw) {
      this.dueDateRaw = new Date(this.dueDateRaw);
      this.dueDate = TaskService.formatDate(this.dueDateRaw);
    }

    if (this.provider === "trello")
      this.initTrelloTask();
    if (this.provider === "sociocortex")
      this.initSacmTask();
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

  private initTrelloTask() {
    this.trelloData = {
      boardId: TaskService.getParameter(this.task, 'boardId')
    };
  }

  private initSacmTask() {
    this.sacmData = {
      caseId: TaskService.getParameter(this.task, 'case')
    };
  }

}
