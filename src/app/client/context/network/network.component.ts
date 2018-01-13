import { Component, Input } from '@angular/core';
import { NetworkService } from '../../shared/network.service'

@Component({
  selector: 'network',
  styleUrls: ['./network.component.css'],
  templateUrl: './network.component.html'
})

export class NetworkComponent {

  private contacts: any;
  public _query: string = 'Please select or enter a name to search';
  private loading: boolean = false;

  @Input()
  set query(query: string) {
    if (query) {
      query = query.trim();
    }
    if (query) {
      this._query = query;
      this.search();
    }
    else
      this._query = 'Please select or enter a name to search';
  }

  get query(): string {
    return this._query;
  }

  constructor(private nt: NetworkService) {
  }

  public ngOnInit() {
    this.nt.list().subscribe((contacts) => {
      this.contacts = contacts;
      this.loading = false;
    });
  }

  public search() {
    this.loading = true;
    this.nt.search(this._query).subscribe((contacts) => {
      this.contacts = contacts;
      this.loading = false;
    });
  }

}
