import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NetworkService } from '../../../shared';

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
      this.fullContact = contact;
      this.loading = false;
    });
  }

}
