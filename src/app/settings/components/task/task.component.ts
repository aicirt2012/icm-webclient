import { Component } from '@angular/core';
import { SettingsService } from '../../shared';
import { SnackbarService } from '../../../shared';



@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css'],
})
export class TaskComponent {

  public currentView: string = 'Trello';
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

    showView(view: string): void{
        this.currentView = view;
        console.log("changed view to " + view);
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

    getCurrentView(view: string) : boolean{
        if(this.currentView == view)
             return true;
        else
             return false;
    }

    getActive(choice: string) : string{
        if(this.currentView == choice)
             return "active";
        else
             return "";
    }

}
