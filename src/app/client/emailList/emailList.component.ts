import {Component, Input, EventEmitter, Output, state} from '@angular/core';
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
  scrollDistance = 2;
  scrollThrottle = 300;
  currentBox: any = '';
  boxList: any[];
  loading: boolean;
  emptyBox: boolean = false;
  loadingList: boolean = false;
  searchTerm: any = '';
  paginationEnabled: boolean = true;

  constructor(public appState: AppState, public router: Router, public activeRoute: ActivatedRoute, private _emailService: EmailService) {
  }

  ngOnInit() {
    console.log('emailListComponent ngOnInit');

    this.boxList = [];
    this.emails = []
    this.currentBox = this.activeRoute.params.map(params => params['boxId'] || 'NONE');
    this.searchTerm = this.activeRoute.snapshot.params['searchTerm'] || '';

    this.appState.dataChange.subscribe(dataChanged => {
      console.log('DATA CHANGE: ' + dataChanged);
      if (this.boxList.length === 0 && dataChanged == 'boxList') { // first boxList loading
        this.boxList = this.appState.getBoxList();

        if (this.searchTerm == '') {  // route: box/boxId
          const currentBoxId = this.activeRoute.snapshot.params['boxId'];
          this.getEmailBox(this.boxList.find((box) => box._id == currentBoxId));
        } else {                      // route: search/searchTerm
          this.searchTerm = this.activeRoute.snapshot.params['searchTerm'] || '';
          this.searchEmails(this.searchTerm);
        }
      }
    })

    this.currentBox.subscribe(boxId => {
      if (this.boxList.length > 0) {
        this.getEmailBox(this.boxList.find((box) => box._id == boxId));
      }
    });
  }

  getBoxIdByURL() {
    return this.activeRoute.snapshot.params['boxId'];
  }

  getEmailBox(box: any, updating?: Boolean) {

    console.log('inside getEmailBox');
    console.log(box);

    this.loading = !!!updating;

    if (!box || box === 'undefined') {
      this.loading = false;
      return;
    }

    this._emailService
      .searchEmailsWithPagination(box._id)
      .subscribe((emails: any) => {
          console.log('emails retrieved');
          console.log(emails);
          this.emails = emails;
          this.appState.setCurrentBox(this.getBoxIdByURL());
          this.appState.setEmails(this.emails);
          if (!updating && this.emails.length > 0 && (this.router.url.match(/\//g).length < 3)) {
            this.router.navigate([`/box/${box._id}/${this.emails[0]._id}`]); // TODO
          }
          this.emptyBox = this.emails.length == 0;
          this.paginationEnabled = true;
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
    console.log('pagination enabled: ' + this.paginationEnabled);
    if (!this.loadingList) {
      if (this.emails.length > 0 && this.paginationEnabled) {
        this.loadingList = true;
        let boxId = this.emails[this.emails.length - 1].box;
        const sort = 'DESC'
        const lastEmailDate = this.emails[this.emails.length - 1].date;

        console.log('search term:' + this.searchTerm);

        if (this.searchTerm != '') {
          boxId = 'NONE' // search over all boxes;
        }

        this._emailService.searchEmailsWithPagination(boxId, sort, this.searchTerm, lastEmailDate)
          .subscribe((emails) => {
            console.log(emails);
            this.paginationEnabled = emails.length > 0 ? true : false;
            if (this.paginationEnabled) {
              this.emails = this.emails.concat(emails);
            }
            this.appState.setEmails(this.emails);
            this.loadingList = false;
          });
      } else {
        this.loadingList = false;
      }
    }
  }

  searchEmails(searchTerm = '') {
    if (searchTerm == '') {
      return;
    }
    this.router.navigate([`/search/` + searchTerm]);
    console.log('inside searchEmailBox');
    console.log(searchTerm);
    const boxId = 'NONE';
    const sort = 'DESC';
    const lastEmailDate = new Date();
    this.searchTerm = searchTerm;
    this.paginationEnabled = true;

    this._emailService
      .searchEmailsWithPagination(boxId, sort, this.searchTerm, lastEmailDate)
      .subscribe((emails: any) => {
          console.log('searched emails');
          console.log(emails)
          this.emails = emails;
          const searchRoute = `search/${searchTerm}`;
          this.appState.setEmails(emails, searchRoute);
        },
        error => {
          console.log(error)
        },
        () => {
          console.log(`Searched mails for term : ${this.searchTerm}`);
        });
  }

}
