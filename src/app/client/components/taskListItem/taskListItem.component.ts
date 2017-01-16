import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
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

  public selectedMembers: any[] = [];
  public possibleMembers: any[] = [];
  public currMember = '';

  constructor(public snackBar: MdSnackBar) {

  }

  ngOnInit() {

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

  openTaskDialog(task:any) {
    this.openDialog.emit(this.task);
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
