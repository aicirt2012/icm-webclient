import { Component } from '@angular/core';
import { SettingsService } from '../../shared';
import { SnackbarService } from '../../../shared';



@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css'],
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

    constructor(private _settingsService: SettingsService, private _snackbarService: SnackbarService) {}

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
        this._snackbarService.setMessage('Update successful');
        this._snackbarService.setShow();
      }, (error) => {
        this._snackbarService.setMessage('Error');
        this._snackbarService.setShow();
      });
    }

}
