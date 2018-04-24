import { Component, Input } from '@angular/core';
import { TranslateService } from '../../shared/translate.service'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'translate',
  styleUrls: ['./translate.component.css'],
  templateUrl: './translate.component.html',
})

export class TranslateComponent {

  private readonly DEFAULT_QUERY_VALUE: string = '';

  private content: any;
  private _query: string = this.DEFAULT_QUERY_VALUE;
  private loading: boolean = false;
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  set query(query: string) {
    if (query) {
      query = query.trim();
    }
    if (query) {
      this._query = query;
      this.translate();
    }
    else this._query = this.DEFAULT_QUERY_VALUE;
  }

  get query(): string {
    return this._query;
  }

  constructor(private ts: TranslateService) {
    this.debouncer
      .debounceTime(100)
      .subscribe(value => this.onInputChanged(value));
  }

  ngOnInit() {
  }

  translate() {
    if (this._query === this.DEFAULT_QUERY_VALUE)
      return;
    this.loading = true;
    this.ts.translate(this._query).subscribe(data => {
      this.content = data;
      this.loading = false;
    });
  }

  private onInputChanged(query) {
    if (query) {
      query = query.trim();
    }
    if (query) {
      this._query = query;
      this.translate();
    }
    else
      this._query = this.DEFAULT_QUERY_VALUE;
  }

}
