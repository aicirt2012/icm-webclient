import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
  selector: 'task-list',
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html'
})

export class TaskListComponent {
  @Input() tasksForMail: any;
  @Input() suggestedTask:any;
  
  constructor() {
  }

  ngOnInit() {
    console.log('hello `TaskList` component');
  }
}
