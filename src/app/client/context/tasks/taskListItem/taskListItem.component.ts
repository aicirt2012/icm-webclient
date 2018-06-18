import { Component, Input } from '@angular/core';

@Component({
  selector: 'task-list-item',
  styleUrls: ['./taskListItem.component.css'],
  templateUrl: './taskListItem.component.html',
})

export class TaskListItemComponent {

  @Input() task: any;

}
