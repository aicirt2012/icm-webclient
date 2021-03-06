import { Component, ElementRef, Input } from '@angular/core';
import { WikiService } from '../../shared/wiki.service'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html',
})

export class WikiComponent {

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
      this.search();
    }
    else
      this._query = this.DEFAULT_QUERY_VALUE;
  }

  get query(): string {
    return this._query;
  }

  constructor(private ws: WikiService, private element: ElementRef) {
    this.debouncer
      .debounceTime(100)
      .subscribe(value => this.onInputChanged(value));
  }

  ngOnInit() {
  }

  search() {
    if (this._query === this.DEFAULT_QUERY_VALUE)
      return;
    this.loading = true;
    this.ws.search(this._query).subscribe(data => {
      this.content = data.teaser;
      this.loading = false;
      window.setTimeout(() => {
        this.addEvents();
      }, 10);
    });
  }

  addEvents() {
    const me = this;
    me.element.nativeElement.querySelectorAll('.wiki-link').forEach((e) => {
      e.addEventListener('click', () => {
        me.query = e.getAttribute('title');
        me.search();
      });
      const baseStyle = 'color:#666;';
      const hoverStyle = 'color:red; cursor:pointer;';
      e.setAttribute('style', baseStyle);
      e.addEventListener('mouseover', () => {
        e.setAttribute('style', hoverStyle);
      });
      e.addEventListener('mouseout', () => {
        e.setAttribute('style', baseStyle);
      });
    });
  }

  private onInputChanged(query) {
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

}
