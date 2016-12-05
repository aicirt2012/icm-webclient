import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalType } from '../../constants';
import { AppState } from '../../../app.service';

@Component({
  selector: 'navbar',  // <navbar></navbar>
  providers: [
  ],
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavBarComponent {
  private navbarItems: any = [];
  @Output() onRefresh = new EventEmitter<boolean>();
  constructor(public appState: AppState, public router: Router) {
    this.appState.getObservableState().subscribe((data) => {
      if (data === 'boxList') {
        this.addDataToBoxes();
      }
    })
  }

  ngOnInit() {
  }

  addDataToBoxes() {
    if (this.appState.get('boxList').length > 0) {
      this.navbarItems = this.appState.get('boxList').map((box) => {
        let icon;
        switch (box.shortName) { //TODO put in service
          case 'INBOX':
            icon = 'glyphicon glyphicon-home'
          case 'Trash':
            icon = 'glyphicon glyphicon-trash'
          default:
            icon = 'glyphicon glyphicon-home'
        };
        box.route = `box/${box.id}`;
        box.icon = icon;
        return box;
      });
    }
  }

  refresh() {
    this.onRefresh.emit(true);
  }
  //
  // getEmails(box?: string) {
  //   /* first change view to mail if necessary */
  //   // if(!this.mailView) this.changeView();
  //   // this.currentBox = box;
  //   this.getEmailBox.emit(box);
  // }
  //
  // openCreateEmailModal() {
  //   this.openModal.emit(ModalType.create);
  // }
  //
}
