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
  templateUrl: './client.component.html'
})
export class ClientComponent {
  public boxList: any = [];
  private noMailboxConnected = false;
  private user: any;
  private syncing: boolean;

  constructor(private _emailService: EmailService, public appState: AppState, private _settingsService: SettingsService) {
  }

  /* INITIALIZE EMAIL APP */
  ngOnInit() {
    this.syncing = true;

    this.appState.dataChange.subscribe((stateChange) => {
      if (this.appState.get('boxList').length > 0) {
        this.boxList = this.appState.get('boxList');
      }
    });

    this._settingsService.getUserInfo().subscribe((user) => {
      this.user = user;
      this.appState.set('user', user);
      if (this.user.provider.name) {
        if (!(this.appState.get('boxList').length > 0)) {
          this.getBoxList().subscribe((data: any[]) => {
            if (data.length > 0) {
              this.syncing = false;
              this.appState.set('boxList', data);
            }
          });
        } else {
          this.syncing = false;
          this.boxList = this.appState.get('boxList');
        }
      } else {
        this.syncing = false;
        this.noMailboxConnected = true;
      }
    })

    let ss = new SocketService(null);
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
      });
    });
  }
}
