import { Component, Input } from '@angular/core';
import { TaskService } from "../../../shared";

@Component({
  selector: 'task-item',
  styleUrls: ['./taskItem.component.css'],
  templateUrl: './taskItem.component.html',
})

export class TaskItemComponent {

  @Input() task: any;
  @Input() index: number;
  @Input() isSuggestion: boolean = false;

  private title: string = "(Untitled Task)";
  private provider: string = "";
  private dueDateRaw: any;
  private dueDate: string;
  private members: any[] = [];
  private completed: boolean;

  constructor() {
  }

  ngOnChanges() {
    if (!this.isSuggestion) {
      console.log("Rendering task:");
      console.log(this.task);
      this.provider = this.task.provider;
      this.title = TaskService.getParameter(this.task, 'name');
      this.dueDateRaw = TaskService.getParameter(this.task, 'due');
      this.members = TaskService.getParameter(this.task, 'idMembers');
      this.completed = TaskService.isTaskCompleted(this.task);
      if (!this.members)
        this.members = [];
      if (this.dueDateRaw) {
        this.dueDateRaw = new Date(this.dueDateRaw);
        this.dueDate = TaskService.formatDate(this.dueDateRaw);
      }
    }
  }

  isOverdue() {
    return this.dueDateRaw && this.dueDateRaw < new Date();
  }

}
