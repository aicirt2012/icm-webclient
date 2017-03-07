import { Component, ViewChild, style, state, animate, transition, trigger } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../app.service';
import * as moment from 'moment';
import { Email } from './shared';
import { EmailService, TaskService } from './shared';
import { SocketService } from '../shared/services/socket.service';

/* TODO:move settingsservice to userservice */
import { SettingsService } from '../settings/shared';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { EmailDialogComponent } from './emailDialog';
import { EmailFolderDialogComponent } from './emailFolderDialog';

@Component({
  selector: 'client',
  styleUrls: ['./client.component.css'],
  templateUrl: './client.component.html',
  providers: [SocketService]
})
export class ClientComponent {
  public boxList: any = [];
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
    /*this._socketService.updateEmail().subscribe((updatedEmail:any)=>{
      console.log('update email2: '+updatedEmail.subject, updatedEmail.date);
      let emails = this.appState.getEmails().map(email => {
        if(email._id == updatedEmail._id)
          email = updatedEmail;
        return email;
      });
      this.appState.setEmails(emails);
    });*/

    this.appState.dataChange.subscribe((stateChange) => {
      if (this.appState.getBoxList().length > 0) {
        this.boxList = this.appState.getBoxList();
      }
    });

    this._settingsService.getUserInfo().subscribe((user) => {
      this.user = user;
      console.log('user info: ', user)
      this.appState.setUser(user);
      if (this.user.provider.name) {
        if (!(this.appState.getBoxList().length > 0)) {
          this.appState.setBoxList(user.boxList);
          this.syncing = false;
          //TODO update mechanism needed
          /*
          this.getBoxList().subscribe((data: any[]) => {
            if (data.length > 0) {
              this.syncing = false;
              this.appState.setBoxList(data);
            }
          });
          */
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
    return this._emailService.updateMailboxList();
  }

  onRefresh(refresh?: boolean) {
    this.syncBoxes([]);
    this.syncBoxes2([]);
    this.syncAll();
  }

  syncBoxes(boxes: string[], update?: boolean) {
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
    if (update) {
      this.updating = true;
    } else {
      this.syncing = true;
    }
    this._emailService.getBoxList().subscribe((boxes) => {
      console.log('boxes2 updated');
      console.log(boxes);
    });
  }

  syncAll() {
    console.log('push sync everything...');
    this._emailService.syncAll().subscribe((result) => {
      console.log('sync everything...');
      console.log(result);
    });
  }

}
