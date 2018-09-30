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
  private assignees: any[] = [];
  private completed: boolean;

  constructor() {
  }

  ngOnChanges() {
    console.log("Rendering task", this.task);

    this.provider = this.task.provider;
    if (this.task.name)
      this.title = this.task.name;
    this.dueDateRaw = this.task.due;
    this.completed = !this.task.isOpen;
    this.assignees = this.task.assignees;

    if (!this.assignees)
      this.assignees = [];
    if (this.dueDateRaw) {
      this.dueDateRaw = new Date(this.dueDateRaw);
      this.dueDate = TaskService.formatDate(this.dueDateRaw);
    }
  }

  isOverdue() {
    return this.dueDateRaw && this.dueDateRaw < new Date();
  }

}
