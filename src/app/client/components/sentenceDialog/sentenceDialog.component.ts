import { DomSanitizer } from '@angular/platform-browser';
import { AppState } from './../../app.service';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmailService, TaskService } from '../shared';
import { Observable } from 'rxjs/Observable';
import { Email, EmailForm } from '../shared';
import { MdDialogRef, MdSnackBar, MdInput, MdIconRegistry } from '@angular/material';

@Component({
  selector: 'sentence-dialog',
  styleUrls: ['./sentenceDialog.component.scss'],
  templateUrl: './sentenceDialog.component.html'
})
export class SentenceDialogComponent {
  sentence: any;
  task: any;
  
  constructor(public emailDialogRef: MdDialogRef<SentenceDialogComponent>, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'brain',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/brain.svg'));
    }

}
