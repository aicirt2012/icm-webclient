import { Component } from '@angular/core';
import { SettingsService } from '../../shared';
import { MdSnackBar, MdInput } from '@angular/material';


@Component({
  selector: 'patterns',
  templateUrl: 'patterns.component.html',
  styleUrls: ['patterns.component.scss'],
  providers: [MdSnackBar]
})
export class PatternsComponent {

  patterns: any[];
  newPattern: string = '';

  constructor(private _settingsService: SettingsService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this._settingsService.getPatterns().subscribe((patterns: any) => {
      this.patterns = patterns;
    })
  }

  addPattern() {
    if (this.newPattern != '')  {
      this._settingsService.createPattern(this.newPattern).subscribe((pattern: any) => {
        this.patterns.push(pattern);
        this.newPattern = '';
      });
    }
  }

  deletePattern(pattern: any) {
    this._settingsService.deletePattern(pattern).subscribe(() => {
      this.patterns.splice(this.patterns.findIndex((p) => p._id == pattern._id), 1);
    });
  }

}
