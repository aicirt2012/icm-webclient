import { Component } from '@angular/core';
import { SettingsService } from '../../shared';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
  providers: [MdSnackBar]
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

  constructor(private _settingsService: SettingsService, private snackBar: MdSnackBar) {}

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe((data: any) => {
      if(data.provider.name) {
        this.emailConfig = data.provider;
      }
    })
  }

  updateEmailConfig() {
    this.emailConfig.smtpDomains = this.emailConfig.smtpDomains.toString().replace(" ","").split(",");
    this._settingsService.updateEmailConfig(this.emailConfig)
    .subscribe((data: any) => {
      this.emailConfig = data.provider;
      this.snackBar.open('Update successful', 'OK');
    }, (error) => {
      this.snackBar.open('Error while updating', 'OK');
    });
  }
}
