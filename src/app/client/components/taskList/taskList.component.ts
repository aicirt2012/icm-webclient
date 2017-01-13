import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaskDialogType} from '../../../shared';

@Component({
  selector: 'task-list',
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html',
})

export class TaskListComponent {
  @Input() linkedTasks: any;
  @Input() suggestedTasks: any;
  @Input() boards: any[];

  @Output() createTask = new EventEmitter<any>();
  @Output() openDialog = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }



}
