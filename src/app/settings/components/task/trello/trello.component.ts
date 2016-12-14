import { Component } from '@angular/core';
import C from '../../../../shared/constants';

@Component({
  selector: 'trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.css'],
})
export class TrelloComponent {

  public mailValid: boolean = true;
  public trelloURL = `${C.server}auth/trello`;

  constructor() {

  }

  ngOnInit() {
  }

}
