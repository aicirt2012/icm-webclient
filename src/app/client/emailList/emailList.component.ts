import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../shared';
import { AppState } from '../../app.service';
import { EmailService } from '../shared';

@Component({
  selector: 'email-list',
  styleUrls: ['./emailList.component.css'],
  templateUrl: './emailList.component.html'
})

export class EmailListComponent {
  emails: Email[];
  page = 1;
  pages: number;
  limit = 25;
  scrollDistance = 2;
  scrollThrottle = 300;
  currentBox: any;
  boxList: any[];
  loading: boolean;
  emptyBox: boolean = false;
  loadingList: boolean = false;
  searchActive: boolean;

  constructor(public appState: AppState, public router: Router, public activeRoute: ActivatedRoute, private _emailService: EmailService) {
    this.page = 1;
  }

  ngOnInit() {
    this.boxList = this.appState.getBoxList().length > 0 ? this.appState.getBoxList() : [];
    this.emails = this.appState.getEmails().length > 0 ? this.appState.getEmails() : [];

    this.appState.dataChange.subscribe((stateChange) => {
      this[stateChange] = this.appState.get(stateChange);
      if (!this.emptyBox && this.emails.length == 0 && this.boxList.length > 0) {
        this.getEmailBox(this.boxList.find((box) => box._id == this.getBoxIdByURL()));
      }
      if (stateChange == 'synced' && !this.searchActive) {
        this.getEmailBox(this.boxList.find((box) => box._id == this.getBoxIdByURL()), true);
      }
    });

    this.currentBox = this.activeRoute.params.map(params => params['boxId'] || 'None');
    this.currentBox.subscribe((boxId) => {
      if (this.boxList.length > 0) {
        boxId === 'None' ? '' : this.getEmailBox(this.boxList.find((box) => box._id == boxId));
      }
    });
  }

  getBoxIdByURL(){
    return this.activeRoute.snapshot.params['boxId'];
  }

  getEmailBox(box: any, updating?: Boolean) {
    const boxName = box ? box.name : 'None';
    this.loading = !!!updating;
    this._emailService
      .getEmailsWithPagination(boxName)
      .subscribe((data: any) => {
        this.emails = data.docs.map((email) => {
          email.route = `/box/${email.box._id}/${email._id}`;
          return email;
        });
        this.page = data.page;
        this.pages = data.pages;
        this.appState.setCurrentBox(this.getBoxIdByURL());
        this.appState.setEmails(this.emails);
        if (!updating && this.emails.length > 0 && (this.router.url.match(/\//g).length < 3)) {
          this.router.navigate([`/box/${box._id}/${this.emails[0]._id}`]);
        }
        this.emptyBox = this.emails.length == 0;
        this.loading = false;
      },
      error => {
        console.log(error);
      },
      () => { console.log(`Mails successfully loaded`) });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  isRead(email) {
    return email.flags.indexOf('\\Seen') > -1;
  }

  onScroll() {
    if (this.page < this.pages && !this.loadingList) {
      this.page += 1;
      const params = {
        box: this.emails[0].box.name,
        page: this.page,
        limit: this.limit
      };
      this.loadingList = true;
      this._emailService.getEmailsWithPagination(params.box, params.page, params.limit).subscribe((res) => {
        const moreEmails: Email[] = res.docs.map((email) => {
          email.route = `/box/${email.box.id}/${email._id}`;
          return email;
        });
        this.page = res.page;
        this.pages = res.pages;
        this.emails = this.emails.concat(moreEmails);
        this.appState.setEmails(this.emails);
        this.loadingList = false;
      });
    }
  }

  searchEmailBox(query = '') {
    const box = this.boxList.find((box) => box.id == this.getBoxIdByURL());
    if (query == '') {
      this.getEmailBox(box);
    }
    this._emailService
      .searchEmailsWithPagination(box.name, query)
      .subscribe((data: any) => {
        this.emails = data.docs.map((email) => {
          email.route = `/box/${email.box.id}/${email._id}`;
          return email;
        });
        this.appState.setEmails(this.emails);
        this.searchActive = true;
      },
      error => {
        console.log(error)
      },
      () => { console.log(`Searched for mails in box ${box.name}`) });
  }

}
