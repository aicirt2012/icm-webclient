import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalType } from '../../../shared/constants';
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
  @Input() boxList: any[];
  @Output() onRefresh = new EventEmitter<boolean>();
  @Output() openModal = new EventEmitter<any>();
  constructor(public appState: AppState, public router: Router) {
    this.navbarItems = this.boxList;
  }

  ngOnChanges() {
    this.addDataToBoxes();
  }

  addDataToBoxes() {
    if (this.boxList.length > 0) {
      this.navbarItems = this.boxList.map((box) => {
        let icon;
        switch (box.shortName) { //TODO put in service
          case 'INBOX':
            icon = 'glyphicon glyphicon-home'
          case 'Trash':
            icon = 'glyphicon glyphicon-trash'
          default:
            icon = 'glyphicon glyphicon-home'
        };
        box.route=`/box/${box.id}`;
        box.icon = icon;
        return box;
      });
    }
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  openCreateEmailModal() {
    this.openModal.emit(ModalType.create);
  }

  isActive(route:string): boolean {
    return this.router.isActive(route, false);
  }

}
