import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalType } from '../../constants';

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
  @Output() openModal = new EventEmitter<any>();
  @Input() mailView: boolean;
  @Output() switchView = new EventEmitter<string>();

  public currentBox: string = '';
  public currentChoice: string = "INBOX";
  private newView: string = '';

  constructor() {
  }

  ngOnInit() {
    console.log('hello `navbar` component');
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  getEmails(box?: string) {
    /* first change view to mail if necessary */
    if(!this.mailView) this.changeView();
    this.currentBox = box;
    this.getEmailBox.emit(box);
  }

  openCreateEmailModal() {
    this.openModal.emit(ModalType.create);
  }

 setActive(choice: string): void{
     this.currentChoice = choice;
 }

 getActive(choice: string) : string{
     if(this.currentChoice == choice)
          return "active";
     else
          return "";
 }

 changeView() {
    if(this.mailView)  this.newView = "profile";
    else this.newView = "mail";
    this.switchView.emit(this.newView);
 }
}
