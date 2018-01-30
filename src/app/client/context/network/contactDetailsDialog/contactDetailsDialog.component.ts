import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NetworkService } from '../../../shared';
import { AppState } from '../../../../app.service';

@Component({
  selector: 'link-task-dialog',
  styleUrls: ['./contactDetailsDialog.component.css'],
  templateUrl: './contactDetailsDialog.component.html'
})
export class ContactDetailsDialogComponent {

  @Input() contact: any;
  public fullContact: any = {};

  constructor(public contactDetailsDialogRef: MatDialogRef<ContactDetailsDialogComponent>, private _networkService: NetworkService, public appState: AppState) {
  }

  ngOnInit() {
    // call networkService and get full contact
  }

  closeDialog() {
    this.contactDetailsDialogRef.close();
  }

}
