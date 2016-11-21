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
  @Output() getEmailBox = new EventEmitter<string>();

  public currentBox: string = '';

  constructor() {
  }

  ngOnInit() {
    console.log('hello `navbar` component');
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  getEmails(box?: string) {
    this.currentBox = box;
    this.getEmailBox.emit(box);
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
