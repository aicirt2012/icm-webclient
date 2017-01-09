import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {TaskModalType} from '../../../shared';

@Component({
  selector: 'task-list',
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html',
})

export class TaskListComponent {
  @Input() linkedTasks: any;
  @Input() suggestedTasks: any;
  @Input() boards: string[];
  @Input() currentTab: string;
  @Output() createTask = new EventEmitter<any>();
  @Input() openTaskModal = new EventEmitter<any>();
  public lists: any = [];
  public boardMembers: any = [];

  constructor() {
  }

  ngOnInit() {
  }

  public createSuggestedTask(suggestedTask: any) {
    console.log("creating suggested Task");
    console.log(suggestedTask);
    suggestedTask['idList'] = this.getListIDByName(suggestedTask);
    this.createTask.emit(suggestedTask);
  }

  public showTaskModal(type: string) {
    if (type == "edit") this.openTaskModal.emit(TaskModalType.edit);
    else this.openTaskModal.emit(TaskModalType.create);
  }

  public changeBoard(value: any) {
    let filteredBoard = this.boards.filter((board:any) => board.name == value)[0];
    this.lists = filteredBoard['lists'] ? filteredBoard['lists'] : [];
    this.boardMembers = filteredBoard['members'] ? filteredBoard['members'] : [];
  }

  public getFilteredBoard(suggestedTask: any) {
    return this.boards.filter((board:any) => board.name == suggestedTask.selectedBoard)[0];
  }

  public getFilteredList(suggestedTask: any) {
    return this.lists.filter((list:any) => list.name == suggestedTask.selectedList)[0];
  }

  public getListIDByName(suggestedTask: any) {
    let filteredBoard = this.getFilteredBoard(suggestedTask);
    this.lists = filteredBoard['lists'] ? filteredBoard['lists'] : [];
    let filteredList = this.getFilteredList(suggestedTask);
    let listID = filteredList['id'] ? filteredList['id'] : "";
    return listID;
  }
}
