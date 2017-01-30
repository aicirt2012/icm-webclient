import { TaskService } from './../client/shared/task.service';
import { Component } from '@angular/core';
import { AuthService } from '../shared';

import { Router } from '@angular/router';
import C from '../shared/constants';

@Component({
  selector: 'task-overview',
  templateUrl: 'taskOverview.component.html',
  styleUrls: ['taskOverview.component.css'],
})
export class TaskOverviewComponent {
  boards: any[] =[];
  fetching: boolean = false;

  constructor(private _taskService: TaskService) { }

  ngOnInit() {
    this.fetching = true;
    this._taskService.getAllBoards({linkedTasks: true}).subscribe((boards) => {
      this.boards = boards;
      this.fetching = false;
      console.log(this.boards);
    });
  
}

}
