import {Component} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {Email} from '../../models';
import {TaskService} from '../../services';

@Component({
  selector: 'taskList',  // <taskList></taskList>
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html'
})
export class TaskListComponent {
  private email:Email;
  private taskName:string = 'testName';
  private taskIdList:string = '582639655429c571aae95b37';
  private taskList: any = null;
  private createdTask: any = null;

  constructor(private _taskService:TaskService) {
  }

  ngOnInit() {
    console.log('hello `TaskList` component');
  }

  getAllTasks() {
    this._taskService.getAllTasks(this.taskIdList).subscribe((tasks) => {
      this.taskList = tasks;
    });
  }

  createTask() {
    this._taskService.createTask(this.email, this.taskName, this.taskIdList)
      .subscribe((task) => {
        this.createdTask = task;
      })
  }

}
