import { Component } from '@angular/core';
import {SettingsService } from '../../shared';


@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
})
export class AccountComponent {

public currentView: string = 'Gmail';
public gmailConfig = {
  user: 'sebisng2@gmail.com',
  password: 's3b1sng2',
  host: 'imap.gmail.com',
  port: 993,
  smtpHost: 'smtp.gmail.com',
  smtpPort: 465,
  smtpDomains: ['gmail.com', 'googlemail.com']
};

  constructor(private _settingsService: SettingsService) {

  }

  ngOnInit() {
  }

  updateGmailConfig() {
    console.log('update user with config', this.gmailConfig);
    this._settingsService.updateEmailConfig(this.gmailConfig, 'gmail')
    .subscribe((data: any) => {
      this.gmailConfig = data.google.emailConfig;
    });
  }

  showView(view: string): void{
      this.currentView = view;
      console.log("changed view to " + view);
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
