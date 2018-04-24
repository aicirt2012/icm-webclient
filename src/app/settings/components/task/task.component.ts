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
    trelloId: '',
    trelloAccessToken: '',
    trelloAccessTokenSecret: '',
    userEmail: ''
  };
  private scConfig = {
    username: '',
    password: ''
  };

    constructor(private userService: UserService, private snackBar:  MatSnackBar) {}

    ngOnInit() {
      this.userService.getUserInfo().subscribe((data) => {
        if(data.trello) {
          this.trelloConfig = data.trello;
        }
        if(data.sociocortex) {
          this.scConfig = data.sociocortex;
        }
      })
    }

    updateUserWithScConfig() {
      this.userService.updateScConfig(this.scConfig)
        .subscribe((data: any) => {
          this.scConfig = data.sociocortex;
          this.snackBar.open('Update successful.', 'OK');
        }, (error) => {
          this.snackBar.open('Error while updating. Try again.', 'OK');

        });
    }

}
