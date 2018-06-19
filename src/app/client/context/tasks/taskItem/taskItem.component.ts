import { Component, Input } from '@angular/core';

@Component({
  selector: 'task-item',
  styleUrls: ['./taskItem.component.css'],
  templateUrl: './taskItem.component.html',
})

export class TaskItemComponent {

  @Input() task: any;
  @Input() index: number;
  @Input() isSuggestion: boolean = true;

  private title: string = "Click to create task";
  private provider: string = "";
  private dueDate: string;
  private members: any[] = [];
  private state: string;

  constructor() {
  }

  ngOnInit() {
  }

  isOverdue() {
    // TODO implement overdue calculation
    return false;
  }

}
