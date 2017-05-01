import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css'],
  providers: [MdSnackBar]
})
export class TaskComponent {

  private trelloConfig = {
    trelloId: '',
    trelloAccessToken: '',
    trelloAccesTokenSecret: ''
  };
  private scConfig = {
    username: '',
    password: ''
  };

    constructor(private userService: UserService, private snackBar:  MdSnackBar) {}

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
