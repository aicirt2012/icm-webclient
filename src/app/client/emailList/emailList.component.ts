import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalDirective} from 'ng2-bootstrap';
import {Email} from '../shared';
import {AppState} from '../../app.service';
import {EmailService} from '../shared';

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
  searchActive: boolean = false;

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

  getBoxIdByURL() {
    return this.activeRoute.snapshot.params['boxId'];
  }

  getEmailBox(box: any, updating?: Boolean) {
    this.loading = !!!updating;
    this._emailService
      .getEmailsWithPagination2(box._id)
      .subscribe((emails: any) => {
          console.log('inside getEmailBox');
          console.log(emails);
          this.emails = emails;
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
        () => {
          console.log(`Mails successfully loaded`)
        });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  isRead(email) {
    return email.flags.indexOf('\\Seen') > -1;
  }

  onScrollDown() {
    console.log('scrolled down');
    if(!this.loadingList) {
      if (this.emails.length > 0) {
        this.loadingList = true;
        const boxId = this.emails[this.emails.length - 1].box;
        const sort = 'DESC'
        const lastEmailDate = this.emails[this.emails.length - 1].date;
        this._emailService.getEmailsWithPagination2(boxId, sort, '', lastEmailDate)
          .subscribe((emails) => {
            console.log(emails);
            this.emails = this.emails.concat(emails);
            this.appState.setEmails(this.emails);
            this.loadingList = false;
          });
      } else {
        this.loadingList = false;
      }
    }
  }

  searchEmailBox(query = '') {
    console.log('inside searchEmailBox');
    console.log(query);
    const sort = 'DESC';
    const box = this.boxList.find((box) => box._id == this.getBoxIdByURL());
    const lastEmailDate = new Date();

    if (query == '') {
      console.log('there is no query');
      this.getEmailBox(box);
    }
    this._emailService
      .searchEmailsWithPagination(box._id, sort, query, lastEmailDate)
      .subscribe((emails: any) => {
          console.log('searched emails');
          console.log(emails)
          this.appState.setEmails(emails);
          this.searchActive = true;
        },
        error => {
          console.log(error)
        },
        () => {
          console.log(`Searched for mails in box ${box.name}`)
        });
  }

}
