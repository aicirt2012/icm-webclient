import { Component, Input } from '@angular/core';
import { TranslateService } from '../../shared/translate.service'

@Component({
  selector: 'translate',
  styleUrls: ['./translate.component.css'],
  templateUrl: './translate.component.html',
})

export class TranslateComponent {

  private content: any;
  public _query: string = 'heft';

  @Input()
  set query(query: string) {
    if (query) {
      query = query.trim();
    }
    if (query) {
      this._query = query;
      this.translate();
    }
    else this._query = 'Please select or enter text to translate';
  }

  get query(): string {
    return this._query;
  }


  constructor(private ts: TranslateService) {
  }

  ngOnInit() {
  }

  translate() {
    this.ts.translate(this._query).subscribe(data => {
      this.content = data;
    });
  }

}
