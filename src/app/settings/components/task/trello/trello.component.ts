import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import C from '../../../../shared/constants';

@Component({
  selector: 'trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.css'],
})
export class TrelloComponent {

  public trelloURL = `${C.server}/auth/trello`;
  @Input() trelloConfig: any;

  constructor(@Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
  }

  public redirectToTrello() {
    this.document.location.href = this.trelloURL;
  }

}
