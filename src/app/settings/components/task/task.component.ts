import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css'],
  providers: [MatSnackBar]
})
export class TaskComponent {

  private trelloConfig = {
    trelloAccessToken: '',
    registrationEmail: ''
  };
  private scConfig = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data) => {
      if (data.taskProviders.trello) {
        this.trelloConfig = data.taskProviders.trello;
      }
      if (data.taskProviders.sociocortex) {
        this.scConfig = data.taskProviders.sociocortex;
      }
    })
  }

}
