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
  currentRouteParams: any;
  searchTerm: any = '';
  paginationEnabled: boolean = true;
  scrollDistance = 2;
  scrollThrottle = 300;
  loading: boolean;
  loadingList: boolean = false;
  // emptyBox: boolean = false;

  constructor(public appState: AppState, public router: Router, public activeRoute: ActivatedRoute, private emailService: EmailService) {
  }

  ngOnInit() {
    console.log('emailListComponent ngOnInit');
    this.boxList = [];
    this.emails = [];

    this.appState.boxList().subscribe(boxList => {
        this.boxList = boxList;
    });

    this.appState.emails().subscribe((emails:Email[]) => {
      this.emails = emails;
    });

    this.activeRoute.params.subscribe(params => {
      const boxId = params['boxId'] || 'NONE';
      this.searchTerm = params['searchTerm'] || '';
      this.paginationEnabled = false;
      this.getEmailList(boxId, this.searchTerm);
    });
  }

  isEmptyResult(){
    return this.emails.length < 1;
  }

  isBoxRoute() {
    return /^(\/box\/)/.test(this.router.url);
  }

  isSearchRoute() {
    return /^(\/search\/)/.test(this.router.url);
  }

  searchEmails(searchTerm = '') {
    if(searchTerm != ''){
      this.searchTerm = searchTerm;
      const customRoute = this.generateNavigationRoute(this.searchTerm);
      this.router.navigate([customRoute]);
    }
  }

  getEmailList(boxId = 'NONE', searchTerm = '', sort = 'DESC', lastEmailDate = new Date()) {
    this.emailService.searchEmailsWithPagination(boxId, sort, searchTerm, lastEmailDate)
      .subscribe((emails: any) => {
        const searchRoute = this.generateNavigationRoute(searchTerm);
        if (this.paginationEnabled) {
          this.appState.setEmails(this.emails.concat(emails), searchRoute, boxId);
        } else {
          this.appState.setEmails(emails, searchRoute, boxId);
        }
        this.emails = this.appState.getEmails();
        this.paginationEnabled = emails.length > 0;
        if (this.emails.length != 0) {
          // this.emptyBox = false;
          this.router.navigate([this.emails[0].route]);
        }
        this.loadingList = false;
        this.loading = false;
      });
  }

  // TODO: move this into the service
  generateNavigationRoute(searchTerm) {
    return searchTerm != '' ? `/search/${searchTerm}` : 'NONE';
  }

  onScrollDown() {
    if (!this.loadingList) {
      if (this.emails.length > 0 && this.paginationEnabled) {
        this.loadingList = true;
        const boxId = this.searchTerm == '' ? this.emails[this.emails.length - 1].box : 'NONE';
        const sort = 'DESC'
        const lastEmailDate = this.emails[this.emails.length - 1].date;
        this.getEmailList(boxId, this.searchTerm, sort, lastEmailDate);
      } else {
        this.loadingList = false;
      }
    }
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  isRead(email) {
    return email.flags.indexOf('\\Seen') > -1;
  }

}
