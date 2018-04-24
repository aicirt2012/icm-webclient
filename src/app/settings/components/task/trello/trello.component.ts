import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import C from '../../../../shared/constants';
import { UserService } from '../../../shared';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.css'],
})
export class TrelloComponent {

  public trelloURL = `${C.server}/auth/trello`;
  @Input() trelloConfig: any;

  constructor(private userService: UserService, @Inject(DOCUMENT) private document: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public onButtonClick() {
    // get most up to date user object
    this.userService.getUserInfo().subscribe((user) => {
      // update trello config
      user.trello = this.trelloConfig;
      // update user object
      this.userService.updateUserInfo(user).subscribe((data) => {
        // redirect to trello if update successful
        this.trelloConfig = data.trello;
        this.document.location.href = this.trelloURL;
      }, (error) => {
        this.snackBar.open('Error while updating. Try again.', 'OK');
      });
    });
  }

}
