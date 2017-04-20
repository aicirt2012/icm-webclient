import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
  selector: 'search-bar',  // <list></list>
  providers: [],
  styleUrls: ['./searchBar.component.css'],
  templateUrl: './searchBar.component.html'
})

export class SearchBarComponent {
  @Output() searchEmailBox = new EventEmitter<string>();
  query: string = this.activeRoute.snapshot.params['searchTerm'];

  constructor(public router: Router, public activeRoute: ActivatedRoute,) {
  }

  search() {
    this.searchEmailBox.emit(this.query);
  }
}
