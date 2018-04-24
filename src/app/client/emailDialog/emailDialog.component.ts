import { AppState } from './../../app.service';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmailService, TaskService } from '../shared';
import { Observable } from 'rxjs/Observable';
import { Email, EmailForm } from '../shared';
import { MatDialogRef, MatSnackBar, MatInput } from '@angular/material';


@Component({
  selector: 'email-dialog',
  styleUrls: ['./emailDialog.component.css'],
  templateUrl: './emailDialog.component.html'
})
export class EmailDialogComponent {

  public emailForm: any = {
    to: [],
    cc: [],
    bcc: [],
    subject: '',
    text: ''
  };
  public cc = false;
  public bcc = false;
  public sending = false;
  public searchForTasks = false;
  public relatedTasks: any = [];
  public user: any;

  constructor(public appState: AppState, private _emailService: EmailService, public emailDialogRef: MatDialogRef<EmailDialogComponent>, private snackBar: MatSnackBar, private _taskService: TaskService) {
  }

  ngOnInit() {
    this.appState.user().subscribe(user => {
      this.user = user;
    });
  }


  //param: sent: boolean   --> if false --> append mail to drafts
  closeDialog() {
    this.emailDialogRef.close();
  }

  addAddress(address: MatInput, addressType: string): void {
    if (address.value && address.value.trim() != '') {
      this.emailForm[addressType].push(address.value.trim());
      address.value = '';
    }
  }

  deleteAddress(index: number, addressType: string) {
    if (index > -1) {
      this.emailForm[addressType].splice(index, 1);
    }
  }

  searchCardsForMembers() {
    this.searchForTasks = true;
    this._taskService.searchCardsForMembers(this.emailForm.to).subscribe((data: any) => {
      console.log(data);
      this.relatedTasks = data;
      this.searchForTasks = false;
    })

  }

  sendEmail() {
    this.sending = true;
    this._emailService
      .sendEmail(this.emailForm)
      .subscribe((data: any) => {
        this.sending = false;
        this.snackBar.open('Message successfully sent.', 'OK');
        this.closeDialog();
      }, (error) => {
        console.log(error);
        this.sending = false;
        this.snackBar.open('Error while sending.', 'OK');
      });
  }

  saveDraft() {
    const boxId = this.appState.getBoxList().find((b) => b.shortName == 'Drafts')._id;
    this.sending = true;

    this._emailService
      .appendEmail(boxId, this.emailForm.to, this.emailForm.subject, this.emailForm.text)
      .subscribe((data: any) => {
        this.sending = false;
        this.snackBar.open('Message saved as a Draft.', 'OK');
        this.closeDialog();
      }, (error) => {
        console.log(error);
        this.sending = false;
        this.snackBar.open('Error while saving Message as a Draft.', 'OK');
      });
  }

  removeTask(task: any) {
    this.relatedTasks = this.relatedTasks.filter((relatedTask: any) => { if (relatedTask.id != task.id) return relatedTask });
  }

}
