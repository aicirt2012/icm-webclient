import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { TaskService } from '../../shared';

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
  @Input() deleteTask: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
      this.task.date = this._taskService.formatDate(this.task.date);
  }

  onCreateTask() {
    this.createTask.emit(this.task);
  }

  openTaskDialog(task: any) {
    if (this.task.taskType == 'linked' && this.task.board) {
      /* For linked task we have to append lists to task.board (We do not get this info from backend) */
      let listsForBoard = this.boards.filter((board) => { if (board.id == this.task.idBoard) return board.lists; })[0].lists;
      this.task.board['lists'] = listsForBoard;
      this.task.board['members'] = this.task.members;
      this.task.selectedBoard = this.task.board;
      this.task.idList = this.task.list;
      this.task.selectedMembers = this.task.members[0];
      this.task.date = this._taskService.formatDate(this.task.due);
    }
    this.openDialog.emit(task);
  }

  removeTask() {
    this.deleteTask.emit(this.task);
  }

}
