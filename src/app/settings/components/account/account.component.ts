import { Component } from '@angular/core';
import { SettingsService } from '../../shared';
import { SnackbarService } from '../../../shared';


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

  constructor(private _settingsService: SettingsService, private _snackbarService: SnackbarService) {}

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe((data: any) => {
      if(data.provider.name) {
        this.emailConfig = data.provider;
      }
    })
  }

  updateEmailConfig() {
    this._settingsService.updateEmailConfig(this.emailConfig)
    .subscribe((data: any) => {
      this.emailConfig = data.provider;
      this._snackbarService.setMessage('Update successful');
      this._snackbarService.setShow();
    }, (error) => {
      this._snackbarService.setMessage('Error');
      this._snackbarService.setShow();
    });
  }
}
