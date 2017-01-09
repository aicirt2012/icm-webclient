import { Component } from '@angular/core';
import {SettingsService } from '../../shared';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
  providers: [MdSnackBar]
})
export class OverviewComponent {

  public editSettings: boolean = false;
  public user = {};

  constructor(private _settingsService: SettingsService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe( (data) => {
      this.user = data;
    });
  }

  updateUser() {
    this._settingsService.updateUserInfo(this.user).subscribe( (data) => {
      this.user = data;
      this.snackBar.open('Update successful.', 'OK');
    }, (error) => {
      this.snackBar.open('Error while updating. Try again.', 'OK');

    });
  }

}
