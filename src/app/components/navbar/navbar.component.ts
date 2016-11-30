import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalType } from '../../constants';
import { AppState } from '../../app.service';

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
  private navbarItems: any = [];

  constructor(public appState: AppState) {
    this.appState = appState;
    this.appState.getObservableState().subscribe((data) => {
      this.addDataToBoxes();
    })
  }

  ngOnInit() {
  }

  addDataToBoxes() {
    console.log(this.appState.get('boxList'));
    if (this.appState.get('boxList').length > 0) {
      this.navbarItems = this.appState.get('boxList').map((box) => {
        let icon;
        switch (box.name) { //TODO put in service
          case 'INBOX':
            icon = 'glyphicon glyphicon-home'
          case 'Trash':
            icon = 'glyphicon glyphicon-trash'
          default:
            icon = 'glyphicon glyphicon-home'
        };
        box.route = `/box/${box.name}`;
        box.icon = icon;
        return box;
      });
    }
  }

  refresh() {
    this.onRefresh.emit(true);
  }

  getEmails(box?: string) {
    /* first change view to mail if necessary */
    // if(!this.mailView) this.changeView();
    // this.currentBox = box;
    this.getEmailBox.emit(box);
  }

  openCreateEmailModal() {
    this.openModal.emit(ModalType.create);
  }

  setActive(choice: string): void {
    this.currentChoice = choice;
  }

  getActive(choice: string): string {
    if (this.currentChoice == choice)
      return "active";
    else
      return "";
  }

  changeView() {
    if (this.mailView) this.newView = "account";
    else this.newView = "mail";
    this.switchView.emit(this.newView);
  }
}
