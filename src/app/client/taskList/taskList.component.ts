import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {Email} from '../shared';
import {TaskService} from '../shared';

@Component({
  selector: 'taskList',  // <taskList></taskList>
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html'
})

export class TaskListComponent {
  @Input() suggestedTask: any;
  @Input() email: Email;
  @Input() tasksForMail: any;
  @Output() syncTasksForMail = new EventEmitter<any>();

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

}
