import { Component } from '@angular/core';
import {SettingsService } from '../../shared';
import { SnackbarService } from '../../../shared';


@Component({
  selector: 'overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
})
export class OverviewComponent {

  public editSettings: boolean = false;
  public user = {};

  constructor(private _settingsService: SettingsService, private _snackbarService: SnackbarService) { }

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe( (data) => {
      this.user = data;
    });
  }

  updateUser() {
    this._settingsService.updateUserInfo(this.user).subscribe( (data) => {
      this.user = data;
      this._snackbarService.setMessage('Update successful');
      this._snackbarService.setShow();
    }, (error) => {
      this._snackbarService.setMessage('Error');
      this._snackbarService.setShow();
    });
  }

}
