import { AppState } from './../../app.service';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmailService, TaskService } from '../shared';
import { Observable } from 'rxjs/Observable';
import { Email, EmailForm } from '../shared';
import { MdDialogRef, MdSnackBar, MdInput } from '@angular/material';


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

  constructor(public appState: AppState, private _emailService: EmailService, public emailDialogRef: MdDialogRef<EmailDialogComponent>, private snackBar: MdSnackBar, private _taskService: TaskService) {
  }

  ngOnInit() {
    this.appState.dataChange.subscribe((stateChange) => {
      this.user = this.appState.get('user');
    })
  }


  //param: sent: boolean   --> if false --> append mail to drafts
  closeDialog() {
    this.emailDialogRef.close();
  }

  addAddress(address: MdInput, addressType: string): void {
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
      .sendMail(this.emailForm)
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
    this._emailService
      .appendMail("[Gmail]/Drafts", this.emailForm.to, this.user ? this.user.email : '', this.emailForm.subject, this.emailForm.text)
      .subscribe((data: any) => {
        console.log("appending successful", data);
      }, (error) => {
        console.log(error);
      });
  }

  removeTask(task: any) {
    this.relatedTasks = this.relatedTasks.filter((relatedTask: any) => { if (relatedTask.id != task.id) return relatedTask });
  }

}
