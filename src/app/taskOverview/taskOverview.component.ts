import { SettingsService } from './../settings/shared/settings.service';
import { User } from './../shared/models/user.model';
import { AppState } from './../app.service';
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
  boards: any[] = [];
  fetching: boolean = false;
  user: any = {};

  constructor(private _taskService: TaskService, private _settingsService: SettingsService) { }

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe((user) => {
      this.user = user;
      console.log(user);
      if (this.user.trello) {
      this.fetching = true;
      this._taskService.getAllBoards({ linkedTasks: true }).subscribe((boards) => {
        this.boards = boards;
        this.fetching = false;
      });
    }
    })
  }

}
