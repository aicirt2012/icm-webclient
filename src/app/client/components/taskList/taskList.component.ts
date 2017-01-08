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

  constructor() {
    this.dueDate = new Date();
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
  //  this.suggestedTask['dueDate'] = this.dueDate;
    this.createTask.emit(suggestedTask);
  }

  public showTaskModal(type: string) {
    if (type == "edit") this.openTaskModal.emit(TaskModalType.edit);
    else this.openTaskModal.emit(TaskModalType.create);
  }

}
