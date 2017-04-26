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
  boxList: any[];
  emails: Email[];
  currentBox: any;
  scrollDistance = 2;
  scrollThrottle = 300;
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
    console.log(this.activeRoute.params);

    this.currentBox = this.activeRoute.params;
    console.log(this.currentBox);

    this.appState.dataChange.subscribe(dataChanged => {
      console.log('DATA CHANGE: ' + dataChanged);
      if (this.boxList.length === 0 && dataChanged == 'boxList') { // first boxList loading
        this.boxList = this.appState.getBoxList();
      }
    })

    this.currentBox.subscribe(params => {
      console.log('ROUTE CHANGE');
      const boxId = params['boxId'] || 'NONE';
      const searchTerm = params['searchTerm'] || '';
      console.log('currentBox: ' + boxId);
      console.log('currentSearch: ' + searchTerm);
      if (boxId == 0) {
        //this.emptyBox = true;
        this.loading = false;
      } else {
        this.getEmailList(boxId, searchTerm);
      }
    });

  }

  getBoxIdByURL() {
    return this.activeRoute.snapshot.params['boxId'];
  }

  getEmailList(boxId = 'NONE', searchTerm = '', sort = 'DESC', lastEmailDate = new Date()) {
    console.log('Inside getEmailList');
    console.log(boxId);
    console.log(searchTerm);
    console.log('....')
    this._emailService.searchEmailsWithPagination(boxId, sort, searchTerm, lastEmailDate)
      .subscribe((emails: any) => {
        console.log('emails retrieved');
        console.log(emails);
        this.emails = emails;
        this.appState.setEmails(this.emails);
        this.emptyBox = this.emails.length == 0;
        this.paginationEnabled = this.emptyBox ? false : true;
        this.loading = false;
        /*
        if (this.emails.length > 0) {
          const customRoute = this.generateNavigationRoute(boxId, searchTerm, this.emails[0]._id);
          this.router.navigate([customRoute]);
        }
        */
      });
  }

  generateNavigationRoute(boxId, searchTerm, emailId = '') {
    let fullRoute = '';
    if (searchTerm != '') {
      fullRoute = `/search/${searchTerm}/${emailId}`;
    } else if (boxId != 0 && boxId != 'NONE') {
      fullRoute = `/box/${boxId}/${emailId}`;
    }
    console.log('new fullroute: ' + fullRoute);
    return fullRoute;
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
    const customRoute = this.generateNavigationRoute('NONE', searchTerm);
    this.router.navigate([customRoute]);
  }

  /*
   searchEmails(searchTerm = '') {
   if (searchTerm == '') {
   return;
   }
   console.log('inside searchEmailBox');
   console.log(searchTerm);
   const boxId = 'NONE';
   const sort = 'DESC';
   const lastEmailDate = new Date();
   this.searchTerm = searchTerm;
   this.paginationEnabled = true;

   this.getEmailList(boxId, this.searchTerm);

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
   */

}
