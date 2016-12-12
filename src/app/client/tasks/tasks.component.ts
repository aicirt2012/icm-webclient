import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {Email} from '../shared';
import {TaskService} from '../shared';
import { ModalType } from '../../shared/constants';

@Component({
  selector: 'tasks',  // <taskList></taskList>
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {
  @Input() suggestedTask: any;
  @Input() email: Email;
  @Input() tasksForMail: any;
  @Output() syncTasksForMail = new EventEmitter<any>();
  @Output() openTaskModalOutput = new EventEmitter<any>();
  @Output() closeTaskModalOutput = new EventEmitter<any>();
  public taskModalType: ModalType = null;

  /* we have to get this from backend */
  private taskIdList: string = '582639655429c571aae95b37';
  private taskList: any = null;
  private createdTask: any = null;

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
    console.log('hello `TaskList` component');
  }

  getAllTasks() {
    this._taskService.getAllTasks(this.taskIdList).subscribe((tasks) => {
      this.taskList = tasks;
      console.log(this.taskList);
    });
  }

  createTask(taskObject: any) {
    this._taskService.createTask(this.email, taskObject, this.taskIdList)
      .subscribe((task) => {
        this.createdTask = task;
        console.log("task has been created");
        this.syncTasks();
      })
  }

  syncTasks() {
    this.syncTasksForMail.emit();
  }

  openTaskModal() {
    this.openTaskModalOutput.emit();
  }

}