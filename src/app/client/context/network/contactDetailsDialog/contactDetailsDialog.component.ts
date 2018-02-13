import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NetworkService } from '../../../shared';
import * as moment from 'moment';

@Component({
  selector: 'contact-details-dialog',
  styleUrls: ['./contactDetailsDialog.component.css'],
  templateUrl: './contactDetailsDialog.component.html'
})
export class ContactDetailsDialogComponent {

  @Input() contact: any;
  private fullContact: any = {};
  private loading = true;

  constructor(public contactDetailsDialogRef: MatDialogRef<ContactDetailsDialogComponent>, private _networkService: NetworkService) {
  }

  ngOnInit() {
    this.loadFullContact();
  }

  closeDialog() {
    this.contactDetailsDialogRef.close();
  }

  loadFullContact() {
    this.loading = true;
    this._networkService.getFullContact(this.contact._id).subscribe((contact) => {
      ContactDetailsDialogComponent.formatDates(contact);
      this.fullContact = contact;
      this.loading = false;
    });
  }

  private static formatDates(contact: any) {
    if (contact.syncedAt) {
      contact.syncedAt = moment(contact.syncedAt).fromNow();
    }
    if (contact.lastModifiedAt) {
      console.log(contact.lastModifiedAt);
      contact.lastModifiedAt = moment(contact.lastModifiedAt).fromNow();
    }
    if (contact.birthday) {
      contact.birthday = moment(contact.birthday).format("MMMM Do YYYY");
    }
  }
}
