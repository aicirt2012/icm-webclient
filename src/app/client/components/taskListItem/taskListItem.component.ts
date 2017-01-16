import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { TaskService } from '../../shared';
import { MdSnackBar} from '@angular/material';

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
  public selectedMembers: any[] = [];
  public possibleMembers: any[] = [];
  public currMember = '';

  constructor(private _taskService: TaskService,public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    if(this.task.taskType == 'linked') this.task.date = this._taskService.formatDate(this.task.due);
    else this.task.date = this._taskService.formatDate(this.task.date);
  }

  onSelectBoard(board:any) {
    this.possibleMembers = board.members;
  }

  onCreateTask() {
    if(this.task.idList) {
      this.task.selectedMembers = this.selectedMembers;
      this.createTask.emit(this.task);
    } else {
      this.snackBar.open('Please select a list.', 'OK');
    }
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
      //this.task.date = this._taskService.formatDate(this.task.due);
    }
    this.openDialog.emit(task);
  }

  removeTask() {
    this.deleteTask.emit(this.task);
  }

  addMember(member: any, index: number): void {
      this.selectedMembers.push(member);
      this.possibleMembers.splice(index,1);
      this.currMember = '';
  }

  deleteMember(member: any, index: number) {
    this.possibleMembers.push(member);
    this.selectedMembers.splice(index,1);
    this.currMember = '';
  }

}
