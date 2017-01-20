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
  @Input() index: any;
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

  openTaskDialog(task: any) {
    if(this.task.taskType == 'linked') {
      this.task.board.lists = this.boards.filter((board) => { if (board.id == this.task.idBoard) return board.lists; })[0].lists;
      this.task.selectedMembers = this.task.members;
      this.task.possibleMembers = this.getPossibleMembers(this.task.board, this.task.selectedMembers);
      }
    else {
      this.task.index = this.index;
    }
    this.openDialog.emit(task);
  }

  getPossibleMembers(selectedBoard, selectedMembers) {
    //In case of opening a linked task, the possibleMembers are just filled with the selected Members from trello
    //Therefore we have to get all available members from boards and then remove the one's that are already selected
    //when there are no selected members we do not need to remove anything
    let membersForBoard = this.boards.filter((board) => { if (board.id == selectedBoard.id) return board.members; })[0].members;
    let selectedMembersIDs = selectedMembers.map((member) => { return member.id} );
    if(selectedMembers.length > 0) membersForBoard = membersForBoard.filter(( member ) => { return selectedMembersIDs.indexOf( member.id ) < 0;});
    return membersForBoard;
  }

  removeTask(task:any) {
    task['index'] = this.index;
    this.deleteTask.emit(task);
  }

}
