import { Component } from '@angular/core';
import { SettingsService } from '../../shared';
import { MdSnackBar, MdInput } from '@angular/material';


@Component({
  selector: 'patterns',
  templateUrl: 'patterns.component.html',
  styleUrls: ['patterns.component.css'],
  providers: [MdSnackBar]
})
export class PatternsComponent {

  patterns: any[];
  
  constructor(private _settingsService: SettingsService, private snackBar: MdSnackBar) {}

  ngOnInit() {
    this._settingsService.getUserInfo().subscribe((user: any) => {
      if(user.patterns) {
        this.patterns = user.patterns;
      }
    })
  }

}
