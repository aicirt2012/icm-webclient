import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskDialogType } from '../../../../../shared';
import { AppState } from '../../../../app.service';
import { TaskService } from '../../../shared';

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

  private suggestedTask: any;

  constructor(private _taskService: TaskService, public appState: AppState) {
  }

  ngOnInit() {
    this.updateSuggestedTask(this.appState.getCurrentEmail());
    this.appState.currentEmail().subscribe(email => {
      this.updateSuggestedTask(email);
    });
  }

  private updateSuggestedTask(email) {
    if (email.suggestedData) {
      this.suggestedData = email.suggestedData;
      this.suggestedTask = {
        taskType: "suggested",
        date: this.suggestedData.dates && this.suggestedData.dates[0] ? this._taskService.formatDate(new Date(this.suggestedData.dates[0])) : undefined,
        name: this.suggestedData.titles ? this.suggestedData.titles[0] : undefined,
        members: this.suggestedData.persons ? this.suggestedData.persons : []
      }
    }
  }

}
