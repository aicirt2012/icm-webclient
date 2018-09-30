import { UserService } from './../settings/shared/user.service';
import { User } from './../shared/models/user.model';
import { AppState } from './../app.service';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((user) => {
      this.user = user;
      if (this.user.trello) {
      this.fetching = true;
      // this.taskService.getAllBoards({ linkedTasks: true }).subscribe((boards) => {
      //   this.boards = boards;
      //   this.fetching = false;
      // });
    }
    })
  }

}
