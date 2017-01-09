import { Component } from '@angular/core';
import { SettingsService } from '../../shared';
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

    constructor(private _settingsService: SettingsService, private snackBar:  MdSnackBar) {}

    ngOnInit() {
      this._settingsService.getUserInfo().subscribe((data) => {
        if(data.trello) {
          this.trelloConfig = data.trello;
        }
        if(data.sociocortex) {
          this.scConfig = data.sociocortex;
        }
      })
    }

    updateUserWithScConfig() {
      this._settingsService.updateScConfig(this.scConfig)
      .subscribe((data: any) => {
        this.scConfig = data.sociocortex;
        this.snackBar.open('Update successful.', 'OK');
      }, (error) => {
        this.snackBar.open('Error while updating. Try again.', 'OK');

      });
    }

}
