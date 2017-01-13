import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'task-list-item',
  styleUrls: ['./taskListItem.component.css'],
  templateUrl: './taskListItem.component.html'
})
export class TaskListItemComponent {
  @Input() task: any;
  @Input() boards: any;
  @Input() createTask: EventEmitter<any> = new EventEmitter<any>();
  @Input() openDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onCreateTask() {
    this.createTask.emit(this.task);
  }

  openTaskDialog(task:any) {
    this.openDialog.emit(this.task);
  }


}
