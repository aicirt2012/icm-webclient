import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'search-bar',  // <list></list>
  providers: [
  ],
  styleUrls: ['./searchBar.component.css'],
  templateUrl: './searchBar.component.html'
})

export class SearchBarComponent {
  @Input() searchEmailBox: any;
  query: string = '';
  constructor() {
  }
  search() {
    this.searchEmailBox.emit(this.query);
  }
}
