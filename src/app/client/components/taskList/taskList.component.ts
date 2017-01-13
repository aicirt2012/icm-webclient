import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaskDialogType} from '../../../shared';

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
  @Output() openDialog = new EventEmitter<any>();

  // @Output() openDialog()

  public lists: any = [];
  public boardMembers: any = [];

  constructor() {
  }

  ngOnInit() {
  }

  public createSuggestedTask(suggestedTask: any) {
    console.log("creating suggested Task");
    console.log(suggestedTask);
    this.createTask.emit(suggestedTask);
  }

  /* fill lists array based on selected board */
    public changeBoard(value: any) {
      let filteredBoard = this.boards.filter((board:any) => board.id == value)[0];
      this.lists = filteredBoard['lists'] ? filteredBoard['lists'] : [];
      this.boardMembers = filteredBoard['members'] ? filteredBoard['members'] : [];
    }

  openTaskDialog(task:any) {
    this.openDialog.emit(task);
  }


/*
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
  }*/
}
