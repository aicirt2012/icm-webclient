import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'task-action-bar',  
  styleUrls: ['./taskActionBar.component.css'],
  templateUrl: './taskActionBar.component.html'
})
export class TaskActionBarComponent {
  @Output() openTaskDialog = new EventEmitter<any>();
  @Output() openLinkTask = new EventEmitter<any>();
  @Output() setSuggestedFilter = new EventEmitter<any>();
  @Output() setLinkedFilter = new EventEmitter<any>();
  public showSuggested: boolean = true;
  public showLinked: boolean = true;

  constructor() {
  }

  openDialogTask() {
    this.openTaskDialog.emit();
  }

  openDialogLinkedTask() {
    this.openLinkTask.emit();
  }

  clickSuggestedFilter() {
    this.setSuggestedFilter.emit(!this.showSuggested);
  }

  clickLinkedFilter() {
    this.setLinkedFilter.emit(!this.showLinked);
  }

}
