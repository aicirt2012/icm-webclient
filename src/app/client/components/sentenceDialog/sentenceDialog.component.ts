import { AppState } from './../../app.service';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmailService, TaskService } from '../shared';
import { Observable } from 'rxjs/Observable';
import { Email, EmailForm } from '../shared';
import { MdDialogRef, MdSnackBar, MdInput } from '@angular/material';

@Component({
  selector: 'sentence-dialog',
  styleUrls: ['./sentenceDialog.component.css'],
  templateUrl: './sentenceDialog.component.html'
})
export class SentenceDialogComponent {
  sentence: any;
  task: any;
  
  constructor(public emailDialogRef: MdDialogRef<SentenceDialogComponent>) {
  }

}
