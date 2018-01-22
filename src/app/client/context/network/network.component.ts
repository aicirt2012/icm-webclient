import { Component, Input } from '@angular/core';
import { NetworkService } from '../../shared/network.service'

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
      this._query = this.DEFAULT_QUERY_VALUE;
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
    if (this._query === this.DEFAULT_QUERY_VALUE)
      return;
    this.loading = true;
    this.nt.search(this._query).subscribe((contacts) => {
      this.contacts = contacts;
      this.loading = false;
    });
  }

}
