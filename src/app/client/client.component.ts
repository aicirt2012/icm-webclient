import {Component, ViewChild, style, state, animate, transition, trigger} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppState} from '../app.service';
import * as moment from 'moment';
import {Email} from './shared';
import {EmailService, TaskService} from './shared';
import {SocketService} from '../shared/services/socket.service';

/* TODO:move settingsservice to userservice */
import {SettingsService} from '../settings/shared';
import {Observable} from 'rxjs/Observable';
import {MdDialog} from '@angular/material';
import {EmailDialogComponent} from './emailDialog';
import {EmailFolderDialogComponent} from './emailFolderDialog';

@Component({
  selector: 'client',
  styleUrls: ['./client.component.css'],
  templateUrl: './client.component.html',
  providers: [SocketService]
})
export class ClientComponent {
  public boxList: any = [];
  private emails: Email[] = [];
  private noMailboxConnected = false;
  private user: any;
  private syncing: boolean;
  private updating: boolean = false;

  constructor(private _emailService: EmailService, public appState: AppState, private _settingsService: SettingsService, private _socketService: SocketService) {
    /*
     setInterval(() => {
     this.syncBoxes([], true);
     }, 1000 * 60);
     */
  }

  /* INITIALIZE EMAIL APP */
  ngOnInit() {
    this.syncing = true;

    this._socketService.openSocketConnection();
    this._socketService.updateEmail().subscribe((updatedEmail: any) => {
      console.log('update email: ' + updatedEmail.subject, updatedEmail.date);
      this.emails = this.appState.getEmails().map(email => {
        email._id == updatedEmail._id ? email = updatedEmail : email;
        email.route = this.setURLRoute(email);
        return email;
      });
      this.appState.setEmails(this.emails);
    });

    this._socketService.createEmail().subscribe((createdEmail: any) => {
      console.log('create email: ' + createdEmail.subject, createdEmail.date);
      console.log(createdEmail);
      createdEmail.route = this.setURLRoute(createdEmail);
      this.emails = this.appState.getEmails();
      this.emails.push(createdEmail);
      this.appState.setEmails(this.emails);
    });

    this._socketService.deleteEmail().subscribe((deletedEmail: any) => {
      console.log('delete: ' + deletedEmail.subject, deletedEmail.date);
      console.log(deletedEmail);
    });

    this._settingsService.getUserInfo().subscribe((user) => {
      this.user = user;
      console.log('user info: ', user)
      this.appState.setUser(user);
      if (this.user.provider.name) {
        if (!(this.appState.getBoxList().length > 0)) {
          //this.appState.setBoxList(user.boxList);
          this.syncing = false;
          this.getBoxList().subscribe((boxes: any[]) => {
            if (boxes.length > 0) {
              this.syncing = false;
              this.appState.setBoxList(boxes);
            }
          });
        } else {
          this.syncing = false;
          this.boxList = this.appState.getBoxList();
        }
      } else {
        this.syncing = false;
        this.noMailboxConnected = true;
      }
    })
  }

  /* FETCHING BOX INFORMATION */
  getBoxList() {
    //return this._emailService.updateMailboxList();
    return this._emailService.getBoxList();
  }

  onRefresh(refresh?: boolean) {
    //this.syncBoxes([]); old syncing mechanism
    this.syncAll();
    this.syncBoxes2([]);
  }

  syncBoxes(boxes: string[], update?: boolean) {
    console.log(boxes);
    if (update) {
      this.updating = true;
    } else {
      this.syncing = true;
    }
    this._emailService.updateMailboxList().subscribe((boxes) => {
      this._emailService.getEmails([]).subscribe((data: any) => {
        this.appState.setBoxList(boxes);
        this.boxList = boxes;
        this.syncing = false;
        this.updating = false;
        this.user.lastSync = new Date();
        this.appState.setUser(this.user);
        this.appState.setSynced(!(!!this.appState.getSynced()));
      });
    });
  }

  syncBoxes2(boxes: string[], update?: boolean) {
    this.updating = true;
    this._emailService.getBoxList().subscribe((boxes) => {
      this.appState.setBoxList(boxes);
      this.boxList = boxes;
      this.updating = false;
      this.user.lastSync = new Date();
      this.appState.setUser(this.user);
      this.appState.setSynced(!(!!this.appState.getSynced()));
    });
  }

  syncAll() {
    this._emailService.syncAll().subscribe((result) => {
      console.log(result);
    });
  }

  /* helpers */
  setURLRoute(email) {
    return email.route = `/box/${email.box._id}/${email._id}`;
  }

}
