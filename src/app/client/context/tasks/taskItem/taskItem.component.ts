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
  private dueDate: any;
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
      this.dueDate = TaskService.getParameter(this.task, 'due');
      this.members = TaskService.getParameter(this.task, 'members');
      if (!this.members)
        this.members = [];
      this.completed = TaskService.isTaskCompleted(this.task);
    }
  }

  isOverdue() {
    // TODO implement overdue calculation
    return false;
  }

}
