import { Component } from '@angular/core';
import { SettingsService } from '../../shared';


@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
})
export class AccountComponent {

public emailConfig = {
  name:'Gmail',
  user: 'sebisng2@gmail.com',
  password: 's3b1sng2',
  host: 'imap.gmail.com',
  port: 993,
  smtpHost: 'smtp.gmail.com',
  smtpPort: 465,
  smtpDomains: ['gmail.com', 'googlemail.com']
};

  constructor(private _settingsService: SettingsService) {}

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe((data: any) => {
      if(data.provider) {
        this.emailConfig = data.provider;
      }
    })
  }

  updateEmailConfig() {
    console.log('update email config', this.emailConfig);
    this._settingsService.updateEmailConfig(this.emailConfig)
    .subscribe((data: any) => {
      console.log(data);
      this.emailConfig = data.provider;
    });
  }

}
