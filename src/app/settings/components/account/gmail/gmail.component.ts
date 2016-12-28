import { Component } from '@angular/core';
import C from '../../../../shared/constants';
import {SettingsService } from '../../../shared';

@Component({
  selector: 'gmail',
  templateUrl: 'gmail.component.html',
  styleUrls: ['gmail.component.css'],
})
export class GmailComponent {

  public mailValid: boolean = true;
  public googleURL = `${C.server}auth/google`;
  public gmailConfig = {
    user: 'sebisng2@gmail.com',
    password: 's3b1sng2',
    host: 'imap.gmail.com'
  };

  constructor(private _settingsService: SettingsService) {

  }

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe((data: any) => {
      this.gmailConfig = data.google.email;
    })
  }


  updateUser() {
    console.log('update user with config');
    this._settingsService.updateEmailConfig(this.gmailConfig)
    .subscribe((data: any) => {
      this.gmailConfig = data.google.email;
    });
  }

}
