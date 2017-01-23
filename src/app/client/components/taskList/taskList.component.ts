import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaskDialogType} from '../../../shared';
import { AppState } from '../../../app.service';

@Component({
  selector: 'task-list',
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html',
})

export class TaskListComponent {
  @Input() linkedTasks: any;
  @Input() suggestedTasks: any;
  public suggestedTasks$: any = [];
  public linkedTasks$: any = [];
  @Input() boards: any[];
  @Output() createTask = new EventEmitter<any>();
  @Output() openDialog = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();
  @Output() openLinkTaskDialog = new EventEmitter<any>();

  constructor(public appState: AppState) {
  }

  ngOnInit() {
    this.suggestedTasks$ = this.appState.dataChange.subscribe((res) => {
      this.suggestedTasks = this.appState.get('suggestedTasks');
    });
    this.linkedTasks$ = this.appState.dataChange.subscribe((res) => {
      this.linkedTasks = this.appState.get('linkedTasks');
    });
  }

  openLinkTask() {
      this.openLinkTaskDialog.emit({'taskType': 'linked'});
  }

  openTaskDialog() {
      this.openDialog.emit({'taskType': 'suggested','status':'empty'});
  }

}
