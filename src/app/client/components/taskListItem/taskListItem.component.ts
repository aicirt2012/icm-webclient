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

  ngOnInit() {

  }

  onCreateTask() {
    this.createTask.emit(this.task);
  }

  openTaskDialog(task:any) {
    /* For linked task we have to append lists to task.board (We do not get this info from backend) */
    let listsForBoard = this.boards.map((board) => { if(board.id == this.task.idBoard) return board.lists; })[0];
    if(this.task.taskType == 'linked') {
      this.task.board['lists'] = listsForBoard;
      this.task.board['members'] = this.task.members;
      this.task.selectedBoard = this.task.board;
      this.task.idList = this.task.list;
      this.task.selectedMembers = this.task.members[0];
    }
    this.openDialog.emit(this.task);
  }

}
