import { Component } from '@angular/core';
import C from '../../../../shared/constants';

@Component({
  selector: 'trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.css'],
})
export class TrelloComponent {

  public trelloURL = `${C.server}auth/trello`;
  public trelloConfig = {};

  constructor() {

  }

  ngOnInit() {
  }

}
