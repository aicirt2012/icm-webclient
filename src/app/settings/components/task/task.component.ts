import { Component } from '@angular/core';
import { SettingsService } from '../../shared';


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

    constructor(private _settingsService: SettingsService) {}

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
        console.log(data);
        this.scConfig = data.sociocortex;
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
