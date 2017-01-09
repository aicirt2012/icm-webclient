import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {TaskModalType} from '../../../shared';

@Component({
  selector: 'task-list',
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html'
})

export class TaskListComponent {
  @Input() linkedTasks: any;
  @Input() suggestedTasks: any;
  @Input() boards: string[];
  @Input() currentTab: string;
  @Output() createTask = new EventEmitter<any>();
  @Input() openTaskModal = new EventEmitter<any>();
  public dueDate: Date;
  private opened: boolean = false;
  public lists: any = [];
  /* Dummy Values --> boardmember names should be included in boards Array */
  public boardMembers: any = [];
  public boardMemberDefault : string = "Peter";

  constructor() {
    this.dueDate = new Date();
    this.boardMembers.push('Peter','Daniel','Constantin','Paul');
  }

  ngOnInit() {
  }

  public openDatePicker(): void {
    this.opened = !this.opened;
  }

  public clearDatePicker(): void {
    this.dueDate = void 0;
  }

  public closeDatePicker(): void {
    this.opened = false;
  }

  public createSuggestedTask(suggestedTask: any) {
    this.createTask.emit(suggestedTask);
  }

  public showTaskModal(type: string) {
    if (type == "edit") this.openTaskModal.emit(TaskModalType.edit);
    else this.openTaskModal.emit(TaskModalType.create);
  }

  public changeBoard(value: any) {
    let filteredBoard = this.boards.filter((board:any) => board.name == value)[0];
    this.lists = filteredBoard['lists'] ? filteredBoard['lists'] : [];
  }
}
