import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import C from '../../../../shared/constants';
import { MatSnackBar } from '@angular/material';
import { TrelloService } from '../../../shared/trello.service';

@Component({
  selector: 'trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.css'],
})
export class TrelloComponent {

  public trelloURL = `${C.server}/auth/trello`;
  @Input() trelloConfig: any;

  constructor(private trelloService: TrelloService, @Inject(DOCUMENT) private document: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public onButtonClick() {
    // update trello config via service, then redirect to trello
    this.trelloService.configure(this.trelloConfig.userEmail).subscribe(response => {
      // redirect to trello if update successful
      this.document.location.href = this.trelloURL;
    }, (error) => {
      // TODO check error if email adress is currently in use
      this.snackBar.open('Error while updating Trello config. Please try again.', 'OK');
    });
  }

}
