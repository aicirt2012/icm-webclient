import { Component, ElementRef, Input } from '@angular/core';
import { WikiService } from '../../shared/wiki.service'

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html',
})

export class WikiComponent {

  private content: any;
  private _query: string = 'Please select or enter text to look up';
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
      this._query = 'Please select or enter text to look up';
  }

  get query(): string {
    return this._query;
  }

  constructor(private ws: WikiService, private element: ElementRef) {
  }

  ngOnInit() {
  }

  search() {
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


}
