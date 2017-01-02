import { Component, Input, Output, EventEmitter } from '@angular/core';
import C from '../../../../shared/constants';
import {SettingsService } from '../../../shared';

@Component({
  selector: 'email-config',
  templateUrl: 'emailConfig.component.html',
  styleUrls: ['emailConfig.component.css'],
})
export class EmailConfigComponent {
  @Input() emailConfig: any;
  @Output() updateEmailConfig = new EventEmitter<any>();


  constructor() {

  }

  ngOnInit() {

  }


  updateUser() {
    this.updateEmailConfig.emit();
  }

}
