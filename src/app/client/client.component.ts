import { Component, ViewChild, style, state, animate, transition, trigger } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../app.service';
import * as moment from 'moment';
import { Email } from './shared';
import { EmailService, TaskService } from './shared';
/* TODO:move settingsservice to userservice */
import { SettingsService } from '../settings/shared';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { EmailDialogComponent } from './emailDialog';

@Component({
  selector: 'client',
  providers: [],
  styleUrls: ['./client.component.css'],
  templateUrl: './client.component.html',
  animations: [trigger('fadeInOut', [
      transition('void => *', [
        style({opacity:0}), //style only for transition transition (after transiton it removes)
        animate(500, style({opacity:1})) // the new state of the transition(after transiton it removes)
      ]),
      transition('* => void', [
      ])
    ])]
})
export class ClientComponent {
  public emails: Email[] = [];
  public email: Email = null;
  public loading: boolean = true;
  public syncing: boolean = true;
  public boxList: any = [];

  private currentBox: Observable<string>;
  private lastFetchedBox: any;
  private currentId: Observable<string>;
  private noMailboxConnected = false;
  private user: any;
  private dialogConfig = {
    width: '80%',
    height: '80%'
  }

  constructor(private _emailService: EmailService, private _taskService: TaskService, public appState: AppState,
    public router: Router, public route: ActivatedRoute, private _settingsService: SettingsService, public dialog: MdDialog) {
    this.currentId = this.route.params.map(params => params['emailId'] || 'None');
    this.currentBox = this.route.params.map(params => params['boxId'] || 'None');
  }

  /* INITIALIZE EMAIL APP */
  ngOnInit() {
    this.syncing = true;

    this._settingsService.getUserInfo().subscribe( (user) => {
      this.user = user;
      console.log('user', user);
      if (this.user.provider.name) {
        if (!(this.appState.get('boxList').length > 0)) {
          this.getBoxList().subscribe((data: any[]) => {
            if (data.length > 0) {
              this.syncing = false;
              this.appState.set('boxList', data);
              this.boxList = data;
              this.getEmailBox(data[0]);
              this.fetchBoxByRouteId();
              this.fetchMailByRouteId();
            }
          });
        } else {
          this.boxList = this.appState.get('boxList');
          this.syncing = false;
          this.fetchBoxByRouteId();
          this.fetchMailByRouteId();
        }
      } else {
        this.syncing = false;
        this.noMailboxConnected = true;
      }
    })
  }

  /* FETCHING BOX INFORMATION */
  getBoxList() {
    return this._emailService.updateMailboxList();
  }

  onRefresh(refresh?: boolean) {
    this.syncBoxes([]);
  }

  syncBoxes(boxes: string[]) {
    this.syncing = true;
    this._emailService.updateMailboxList().subscribe((data) => {
      this.appState.set('boxList', data);
      this.boxList = data;
      this._emailService.getEmails([]).subscribe((data: any) => {
        this.syncing = false;
        this.getEmailBox(this.boxList[0]);
      });
    });
  }

  refreshBoxList(boxList?: any[]) {
      if (boxList) {
        this.appState.set('boxList', boxList);
        this.boxList = boxList;
      } else {
        this.getBoxList().subscribe((data: any[]) => {
          if (data.length > 0) {
            this.appState.set('boxList', data);
            this.boxList = data;
          }
        });
    }
  }

  /* FETCHING EMAILS BY BOX */
  fetchBoxByRouteId() {
      // TODO: logic that only if box differs this is refetched
    this.currentBox.subscribe((boxId) => {
      boxId === 'None' ? '' : this.getEmailBox(this.boxList.filter((box) => box.id == boxId)[0]);
    });
  }

  getEmailBox(box?: any) {
    this.loading = true;
    this._emailService
      .getEmailsWithPagination(box.name)
      .subscribe((data: any) => {
        this.lastFetchedBox = box;
        this.emails = data.docs.map((email) => {
          email.route = `/box/${email.box.id}/${email._id}`;
          return email;
        });
        this.loading = false;
      },
      error => {
        console.log(error)
      },
      () => { console.log(`Mails successfully loaded`) });
  }

  searchEmailBox(query = '') {
    this.loading = true;
    this._emailService
      .searchEmailsWithPagination(this.lastFetchedBox.name, query)
      .subscribe((data: any) => {
        this.emails = data.docs.map((email) => {
          email.route = `/box/${email.box.id}/${email._id}`;
          return email;
        });
        this.loading = false;
      },
      error => {
        console.log(error)
      },
      () => { console.log(`Mails successfully loaded`) });
  }

  /* FETCHING SINGLE EMAIL */
  fetchMailByRouteId() {
      //TODO: logic that only if email differs, this is refetched
    this.currentId.subscribe((emailId) => {
      emailId === 'None' ? '' : this.getSingleMail(emailId);
    });
  }

  getSingleMail(id?: string) {
    this._emailService
      .getSingleMail(id)
      .subscribe((data: any) => {
        this.email = data;
      },
      error => {
        console.log(error)
      },
      () => {
        console.log(`Message with ID: ${id} has been successfully loaded`)
      });
  }

  /* GET EMAILS WITH PAGINATION */
  onEmailListScrolling(params: any) {
    this._emailService.getEmailsWithPagination(params.box, params.page, params.limit).subscribe((res) => {
      const moreEmails: Email[] = res.docs.map((email) => {
        email.route = `/box/${email.box.id}/${email._id}`;
        return email;
      });
      Array.prototype.push.apply(this.emails, moreEmails);
    });
  }

  /* EMAIL-RELATED ACTION-LISTENERS */
onEmailMoveToBox(params: any) {
  this._emailService.moveMail(params.msgId, params.srcBox, params.destBox).subscribe((res) => {
      console.log(res);
  });
}

onAddBox(boxName: string) {
    this._emailService.addBox(boxName).subscribe((res) => {
        this.refreshBoxList(res.boxList);
    });
}

onDeleteBox(boxName: string) {
    this._emailService.delBox(boxName).subscribe((res) => {
        this.refreshBoxList(res.boxList);
    });
}

/* msgId: string, flags: string[], boxName: string */
onAddFlags(params:any) {
    this._emailService.addFlags(params.email.uid, params.flags, params.box).subscribe((res) => {
        params.email.flags = params.email.flags.concat(params.flags);
    });
}

/* msgId: string, flags: string[], boxName: string */
onDeleteFlags(params:any) {
    this._emailService.delFlags(params.email.uid, params.flags, params.box).subscribe((res) => {
        params.flags.forEach((f) => {
            params.email.flags.splice(params.email.flags.indexOf(f),1);
        });
    });
}

  /* HELPERS */
  openDialog() {
    let dialogRef = this.dialog.open(EmailDialogComponent, this.dialogConfig);
  }


}
