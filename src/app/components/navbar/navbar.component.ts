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

  openCreateEmailModal() {
    this.openModal.emit(ModalType.create);
  }



}
