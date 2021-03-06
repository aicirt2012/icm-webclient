import { Component, ViewChild, style, state, animate, transition, trigger } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppState } from '../app.service';
import { Email, EmailService, BoxService, TaskService } from './shared';
import { SocketService } from '../shared/services/socket.service';
import { UserService } from '../settings/shared'; // TODO:move settingsservice to userservice
import { Observable } from 'rxjs/Observable';
import { EmailDialogComponent } from './emailDialog';
import { EmailFolderDialogComponent } from './emailFolderDialog';
import { ResizeEvent } from 'angular-resizable-element';
import _ from 'lodash';

@Component({
  selector: 'client',
  styleUrls: ['./client.component.css'],
  templateUrl: './client.component.html',
  providers: [SocketService]
})
export class ClientComponent {
  public boxList: any = [];
  private emails: Email[] = [];
  private email: Email;
  private noMailboxConnected = false;
  private user: any;
  private syncing: boolean;
  private updating: boolean = false;
  private boxListFlex = 15;
  private emailListFlex = 20;
  private contextFlex = 20;

  constructor(private emailService: EmailService, private boxService: BoxService,
              public appState: AppState,
              private userService: UserService,
              private socketService: SocketService,
              public snackBar: MatSnackBar) {
  }


  ngOnInit() {
    this.syncing = true;

    this.socketService.openSocketConnection();
    this.socketService.updateEmail().subscribe((updatedEmail: any) => {
      console.log('update email: ' + updatedEmail.subject, updatedEmail.date);
      console.log(updatedEmail.boxes);

      let isDeletable = false;

      if (_.find(this.appState.getEmails(), {'_id': updatedEmail._id})) {
        console.log('email already in the list...');
        isDeletable = true; // already in the emailList
      }

      if (_.includes(updatedEmail.boxes, this.appState.getCurrentBox()._id)) {
        console.log('this email belong to current box... pushing');
        this.appState.updateEmail(updatedEmail);
        this.emails = this.appState.getEmails();
        isDeletable = false;
      }

      if (isDeletable) { // already in the emailList but does not belong to the box anymore
        console.log('this email should be removed from the email list... deleting');
        this.appState.deleteEmail(updatedEmail);
        this.emails = this.appState.getEmails();
      }

    });

    this.socketService.createEmail().subscribe((createdEmail: any) => {
      console.log('create email: ' + createdEmail.subject, createdEmail.date);
      if (this.appState.getEmails().length > 0) {
        if (_.includes(createdEmail.boxes, this.appState.getCurrentBox()._id)) {
          console.log('this email belong to current box... pushing create');
          this.appState.createEmail(createdEmail);
          this.emails = this.appState.getEmails();
        }
      }
    });

    this.socketService.deleteEmail().subscribe((deletedEmail: any) => {
      console.log('delete email: ' + deletedEmail.subject, deletedEmail.date);
      this.appState.deleteEmail(deletedEmail);
      this.emails = this.appState.getEmails();
    });

    this.socketService.createBox().subscribe((createdBox: any) => {
      console.log('create box: ' + createdBox.name);
      if (this.appState.getBoxList().length > 0) {
        this.boxList = this.appState.getBoxList();
      }
      this.boxList.push(createdBox);
      this.appState.setBoxList(this.boxList);
    });

    this.socketService.updateBox().subscribe((updatedBox: any) => {
      console.log('update box: ' + updatedBox.name);
      if (this.appState.getBoxList().length > 0) {
        this.boxList = this.appState.getBoxList().map(box => {
          box._id == updatedBox._id ? box = updatedBox : box;
          return box;
        });
        this.appState.setBoxList(this.boxList);
      }
    });

    this.socketService.deleteBox().subscribe((deletedBox: any) => {
      console.log('delete box: ' + deletedBox.name);
      if (this.appState.getBoxList().length > 0) {
        this.boxList = this.appState.getBoxList().filter(box => {
          return box._id != deletedBox._id
        });
        this.appState.setBoxList(this.boxList);
      }
    });

    if (this.appState.getBoxList() != null)
      this.boxList = this.appState.getBoxList();
    this.boxService.getBoxList().subscribe((boxes: any[]) => {
      this.appState.setBoxList(boxes);
      this.boxList = this.appState.getBoxList();
    });

    this.userService.getUserInfo().subscribe((user) => {
      this.user = user;
      this.appState.setUser(user);
      if (!this.user['provider']) {
        this.noMailboxConnected = true;
      }
      this.syncing = false;
    })

  }

  onRefresh(refresh?: boolean) {
    this.updating = true;
    this.boxService.syncAll().subscribe((result) => {
      console.log(result);
      this.updating = false;
    });
  }

  moveEmailToBox(data: any) {
    const emailId = data.emailId;
    const newBoxId = data.newBoxId;
    console.log('reach client' + emailId + " " + newBoxId);
    this.emailService.moveEmail(emailId, newBoxId).subscribe(res => {
      this.emails.splice(this.emails.findIndex(e => emailId == e._id), 1);
      this.appState.setEmails(this.emails);
      const destBox = this.boxList.find(b => b._id == newBoxId).shortName;
      this.snackBar.open(`Message successfully moved to ${destBox}.`, 'OK');
    }, err => {
      console.log(err);
      this.snackBar.open('Error when moving Message.', 'OK');
    });
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    if (event.edges.left < 0) {
      this.emailListFlex = 0;
    } else {
      this.emailListFlex = 20;
    }
  }

}
