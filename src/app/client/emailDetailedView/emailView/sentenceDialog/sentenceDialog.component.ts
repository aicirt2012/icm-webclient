import { DomSanitizer } from '@angular/platform-browser';
import { AppState } from './../../../../app.service';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmailService, Email, EmailForm } from '../../../shared';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MatSnackBar, MatInput, MatIconRegistry } from '@angular/material';

@Component({
  selector: 'sentence-dialog',
  styleUrls: ['./sentenceDialog.component.scss'],
  templateUrl: './sentenceDialog.component.html'
})
export class SentenceDialogComponent {
  sentence: any;
  task: any;

  constructor(public emailDialogRef: MatDialogRef<SentenceDialogComponent>, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'brain',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/brain.svg'));
    }

}
