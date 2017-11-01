import { Component, Input, EventEmitter, Output, ViewChild, state } from '@angular/core';
import { Email } from '../shared';
import { EmailService } from '../shared';
import { WindowRef } from '../shared/window.ref.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../../app.service';


@Component({
  selector: 'email-detailed-view',
  styleUrls: ['./emailDetailedView.component.css'],
  templateUrl: './emailDetailedView.component.html'
})
export class EmailDetailedViewComponent {
  currentBox: string;
  email: Email;
  emails: Email[];
  currentId: any;
  boxList: any[];
  public responseStatus: boolean;
  private emailResponse: any;
  private sending = false;
  private manuallyRemovedFlag = false;
  private moving = false;

  constructor(private emailService: EmailService, public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute, public appState: AppState, public router: Router,
              public windowRef: WindowRef) {
    this.emailResponse = {};
    this.responseStatus = false;
  }

  ngOnInit() {
    this.emails = this.appState.getEmails().length > 0 ? this.appState.getEmails(): [];
    this.boxList = this.appState.getBoxList().length > 0 ? this.appState.getBoxList(): [];

    this.appState.boxList().subscribe(boxList => {
      this.boxList = boxList;
    });

    this.appState.emails().subscribe(emails => {
      this.emails = emails;
    });

    this.currentId = this.activatedRoute.params.map(params => params['emailId'] || 'None');
    this.currentId.subscribe((emailId) => {
      console.log('get single email...');
      emailId !== 'None' ? emailId === 'new' ? this.createNewEmailDraft() : this.getSingleMail(emailId) : '';
    });

    this.currentSelectedText();
  }

  private currentSelectedText() {
    const self = this;
    /*
    setInterval(() => {
      console.log(self.windowRef.nativeWindow.getSelection().toString());
    }, 300);
    */
  }

  private createNewEmailDraft() {
    console.log('creating a new email draft');
    this.responseStatus = true;
    this.generateEmailResponse('new');
  }

  private generateEmailResponse(type: string) {
    this.responseStatus = true;
    this.emailResponse = this.emailService.generateEmailForm(this.email, type);
  }

  private discardEmailResponse() {
    this.responseStatus = false;
    this.emailResponse = {};

    const url = this.activatedRoute.parent.url.value[0].path;
    const outlets = {}

    this.activatedRoute.parent.children.forEach((child) => {
      Object.assign(outlets, child.snapshot.params);
    });

    outlets['emailId'] = this.email._id;

    this.router.navigate([url, {outlets}]);
  }

  private sendEmail(mail: any) {
    this.sending = true;
    this.emailService
      .sendEmail(mail)
      .subscribe((data: any) => {
        this.sending = false;
        this.emailResponse = {};
        this.responseStatus = false;
        this.snackBar.open('Message successfully sent.', 'OK');
        this.emailResponse = {};
        this.responseStatus = false;
      }, (error) => {
        this.sending = false;
        this.snackBar.open('Error while sending.', 'OK');
      });
  }

  private getSingleMail(emailId: string) {
    this.emailService.getEmail(emailId)
      .subscribe((data: any) => {
        if (data.sentences) {
          data.sentences = data.sentences.map((s) => { s.highlighted = false; return s });
        }
        this.email = data;
        if (this.email.flags.indexOf('\\Seen') == -1) {
          this.addFlags(['\\Seen']);
        }

      },
      error => {
        console.log(error)
      },
      () => {
        console.log(`Message with ID: ${emailId} has been successfully loaded`)
      });
  }

  private emailMoveToTrash(emailId: any) {
    this.moving = true;
    this.emailService.moveEmailToTrash(emailId).subscribe((res) => {
      this.snackBar.open(`Message successfully moved to Trash`, 'OK');
      this.moving = false;
    }, (err) => {
      console.log(err);
      this.snackBar.open('Error when moving Message to Trash', 'OK');
      this.moving = false;
    });
  }

  private emailMoveToBox(params: any) {
    this.moving = true;
    this.emailService.moveEmail(params.emailId, params.newBoxId).subscribe((res) => {
      const destBox = this.boxList.find((b) => b._id == params.newBoxId).shortName;
      this.snackBar.open(`Message successfully moved to ${destBox}.`, 'OK');
      this.moving = false;
    }, (err) => {
      console.log(err);
      this.snackBar.open('Error when moving Message.', 'OK');
      this.moving = false;
    });
  }

  private addFlags(flags: string[]) {
    const oldEmail = Object.assign(this.email);
    const oldEmails = this.appState.getEmails();
    const oldBoxList = this.appState.getBoxList();

    this.email.flags = this.email.flags.concat(flags);
    this.emails = this.emails.map((email) => {
      if (this.email._id == email._id) {
        email.flags = this.email.flags;
      }
      return email;
    });
    this.boxList = this.boxList.map((box) => {
      if (box._id == this.email.box) {
        box.unseen -= 1;
      }
      return box;
    });
    this.appState.setBoxList(this.boxList);
    this.appState.setEmails(this.emails);

    this.emailService.addFlags(this.email._id, flags).subscribe((res) => {}, (err) => {
      this.email = Object.assign(oldEmail);
      this.appState.setEmails(oldEmails);
      this.appState.setBoxList(oldBoxList);
      this.snackBar.open('Error while setting email to READ.', 'OK');
    }, () => {
    });
  }

  private deleteFlags(flags: string[]) {
    const oldEmail = Object.assign(this.email);
    const oldEmails = this.appState.getEmails();
    const oldBoxList = this.appState.getBoxList();

    flags.forEach((f) => {
      this.email.flags.splice(this.email.flags.indexOf(f), 1);
    });

    this.emails.map((email) => {
      if (this.email._id == email._id) {
        email.flags = this.email.flags;
      }
      return email;
    });

    this.boxList.map((box) => {
      if (box._id == this.email.box) {
        box.unseen += 1;
      }
      return box;
    });

    this.appState.setEmails(this.emails);
    this.appState.setBoxList(this.boxList);

    this.emailService.delFlags(this.email._id, flags).subscribe((res) => {
    }, (err) => {
      this.email = Object.assign(oldEmail);
      this.appState.setEmails(oldEmails);
      this.appState.setBoxList(oldBoxList);
      this.snackBar.open('Error while setting email to READ.', 'OK');
    }, () => {
    })
  }

  private highlightSentence(h: any) {
    const sentence = this.email.sentences.find((s) => s.id == h.id);
    this.email.sentences.forEach((s) => { s.highlighted = false });
    this.email.suggestedTasks.forEach((t) => {
      t.highlight = false;
      if (t.task.id == h.id) {
        sentence.highlighted = h.highlight;
        t.highlight = h.highlight;
      }
    });
  }

}
