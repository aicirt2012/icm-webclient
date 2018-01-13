import { Component, Input } from '@angular/core';
import { TranslateService } from '../../shared/translate.service'

@Component({
  selector: 'translate',
  styleUrls: ['./translate.component.css'],
  templateUrl: './translate.component.html',
})

export class TranslateComponent {

  private readonly DEFAULT_QUERY_VALUE: string = 'Please select or enter text to translate';

  private content: any;
  private _query: string = this.DEFAULT_QUERY_VALUE;

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
  }

  ngOnInit() {
  }

  translate() {
    if (this._query === this.DEFAULT_QUERY_VALUE)
      return;
    this.ts.translate(this._query).subscribe(data => {
      this.content = data;
    });
  }

}
