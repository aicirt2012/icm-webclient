import { ModalDirective } from 'ng2-bootstrap';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'navbar',  // <navbar></navbar>
  providers: [
  ],
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavBarComponent {
  @Output() onRefresh = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    console.log('hello `navbar` component');
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  // public loadInboxEmails() : void {
  //   this.listComponent.loadInboxEmails();
  // }
  //
  // public loadSentEmails() : void {
  //   this.listComponent.loadSentEmails();
  // }
  //
  // public loadDraftEmails() : void {
  //   this.listComponent.loadDraftEmails();
  // }
  //
  // public loadTrashEmails() : void {
  //   this.listComponent.loadTrashEmails();
  // }
  //
  // public loadBoxes() : void {
  //   this.listComponent.loadBoxes();
  // }

}
