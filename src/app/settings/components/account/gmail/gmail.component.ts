import { Component } from '@angular/core';
import C from '../../../../shared/constants';

@Component({
  selector: 'gmail',
  templateUrl: 'gmail.component.html',
  styleUrls: ['gmail.component.css'],
})
export class GmailComponent {

  public mailValid: boolean = true;
  public googleURL = `${C.server}auth/google`;

  constructor() {

  }

  ngOnInit() {
  }

}
