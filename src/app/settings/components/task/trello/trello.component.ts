import { Component, Input } from '@angular/core';
import C from '../../../../shared/constants';

@Component({
  selector: 'trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.css'],
})
export class TrelloComponent {

  public trelloURL = `${C.server}/auth/trello`;
  @Input() trelloConfig: any;

  constructor() {}

  ngOnInit() {
  }

}
