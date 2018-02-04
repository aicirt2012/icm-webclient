import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaskDialogType} from '../../../../../shared';
import { AppState } from '../../../../../app.service';

@Component({
  selector: 'task-list',
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html',
})

export class TaskListComponent {
  @Input() linkedTasks: any[];
  @Input() suggestedData: any;
  @Input() boards: any[];
  @Output() createTask = new EventEmitter<any>();
  @Output() openDialog = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();
  @Output() openLinkTaskDialog = new EventEmitter<any>();
  @Output() highlightSentence = new EventEmitter<any>();
  @Output() hightlightTaskItem = new EventEmitter<any>();
}
