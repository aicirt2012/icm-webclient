import { Component } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'navbar',  // <navbar></navbar>
  providers: [
  ],
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavBarComponent {

  constructor() {
  }

  ngOnInit() {
    console.log('hello `navbar` component');
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
