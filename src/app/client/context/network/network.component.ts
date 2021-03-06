import { Component, Input } from '@angular/core';
import { NetworkService } from '../../shared/network.service'
import { MatDialog, MatDialogRef } from '@angular/material';
import { ContactDetailsDialogComponent } from './contactDetailsDialog';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'network',
  styleUrls: ['./network.component.css'],
  templateUrl: './network.component.html'
})

export class NetworkComponent {

  private readonly DEFAULT_QUERY_VALUE: string = '';

  private contacts: any;
  private _query: string = this.DEFAULT_QUERY_VALUE;
  private loading: boolean = false;
  private dialogConfig = {
    'min-width': "30%",
    'max-width': "80%",
    height: 'auto',
  };
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  set query(query: string) {
    this.debouncer.next(query);
  }

  get query(): string {
    return this._query;
  }

  constructor(private nt: NetworkService, public dialog: MatDialog) {
    this.debouncer
      .debounceTime(100)
      .subscribe(value => this.onInputChanged(value));
  }

  public ngOnInit() {
    this.nt.list().subscribe((contacts) => {
      this.contacts = this.composeAndAppendDescriptions(contacts);
      this.loading = false;
    });
  }

  public search() {
    // TODO add message to signalize the user that <=2 characters is too little text instead of just ignoring
    if (!this._query || this._query === this.DEFAULT_QUERY_VALUE || this._query.trim().length < 3)
      return;
    this.loading = true;
    this.nt.search(this._query).subscribe((contacts) => {
      this.contacts = this.composeAndAppendDescriptions(contacts);
      this.loading = false;
    });
  }

  openDialog(contact: any) {
    let contactDetailsDialogRef: MatDialogRef<ContactDetailsDialogComponent> = this.dialog.open(ContactDetailsDialogComponent, this.dialogConfig);
    contactDetailsDialogRef.componentInstance.contact = contact;
  }

  private onInputChanged(query: string) {
    if (query) {
      query = query.trim();
    }
    if (query) {
      this._query = query;
      this.search();
    }
    else
      this._query = this.DEFAULT_QUERY_VALUE;
  }

  private composeAndAppendDescriptions(contacts: any) {
    // TODO evaluate if this can be used as an onChange listener instead
    contacts.forEach((contact) => {
      let description = "";
      description = NetworkComponent.appendSafely(description, contact.businessJobTitle);
      description = NetworkComponent.appendSafely(description, contact.businessCompany);
      description = NetworkComponent.appendSafely(description, contact.businessDepartment);
      description = NetworkComponent.appendSafely(description, contact.businessStreet);
      if (description.length > 0)
        description = description.substring(0, description.length - 3);
      contact.description = description;
    });
    return contacts;
  }

  private static appendSafely(description, value) {
    if (value) {
      description += value + " | ";
    }
    return description;
  }

}
