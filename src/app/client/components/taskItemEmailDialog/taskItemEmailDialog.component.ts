import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'task-item-email-dialog',
  styleUrls: ['./taskItemEmailDialog.component.css'],
  templateUrl: './taskItemEmailDialog.component.html'
})
export class TaskItemEmailDialogComponent {
  @Input() task: any;

  constructor() {
  }

  ngOnInit() {
  }

}
