import { Component } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'taskList',  // <taskList></taskList>
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html'
})
export class TaskListComponent {

  constructor() {
  }
  ngOnInit() {
    console.log('hello `TaskList` component');
  }

}
