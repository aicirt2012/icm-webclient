import { Component } from '@angular/core';
import {SettingsService } from '../../shared';


@Component({
  selector: 'overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
})
export class OverviewComponent {

  public editSettings: boolean = false;
  public user = {};

  constructor(private _settingsService: SettingsService) { }

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe( (data) => {
      console.log(data);
      this.user = data;
    });
  }

}
