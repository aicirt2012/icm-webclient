import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import C from '../../../../shared/constants';
import { MatSnackBar } from '@angular/material';
import { TaskService } from '../../../shared';

@Component({
  selector: 'trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.css'],
})
export class TrelloComponent {

  public trelloURL = `${C.server}/auth/trello`;
  @Input() trelloConfig: any;

  constructor(private taskService: TaskService, @Inject(DOCUMENT) private document: any, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public onButtonClick() {
    // update trello config via service, then redirect to trello
    this.taskService.configureTrello(this.trelloConfig.userEmail).subscribe(() => {
      // redirect to trello if update successful
      this.document.location.href = this.trelloURL;
    }, (error) => {
      if (error.status == 409)
        this.snackBar.open(error._body, 'OK');
      else
        this.snackBar.open('Error while updating Trello config. Please try again.', 'OK');
    });
  }

}
