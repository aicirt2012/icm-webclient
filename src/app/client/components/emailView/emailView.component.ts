import { MdDialog } from '@angular/material';
import { SentenceDialogComponent } from './../sentenceDialog/sentenceDialog.component';
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../shared';

@Component({
  selector: 'email-view',
  styleUrls: ['./emailView.component.css'],
  templateUrl: './emailView.component.html'
})
export class EmailViewComponent {
  @Input() email: Email;
  @Output() highlightSentence: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('iframe') iframe: ElementRef;

  constructor(private sanitizer: DomSanitizer, public dialog: MdDialog) {
  }

  ngOnChanges() {
    if (this.email.html) {
      this.email.html = typeof this.email.html === 'string' ? this.sanitizer.bypassSecurityTrustHtml(this.email.html) : this.email.html;
    }
  }

  highlight(id: any, highlight: boolean) {
    this.highlightSentence.emit({ id: id, highlight: highlight });
  }

  adjustIframeSize(iframe: HTMLIFrameElement, topSection: HTMLElement) {
    if (iframe) {
      iframe.style.height = 'inherit';
      const height = iframe.contentDocument.body.scrollHeight;
      iframe.style.height = height + 'px';
      if (this.wrapper && height > this.wrapper.nativeElement.clientHeight) {
        this.wrapper.nativeElement.style.height = (height + topSection.clientHeight) + 'px';
      } else if(this.wrapper) {
        this.wrapper.nativeElement.style.height = 'inherit';
      }
    }
  }

  sentenceContainsTask(sentenceId: any) {
    return this.email.suggestedTasks.find((t) => t.task.id == sentenceId);
  }

  openSentenceDialog(sentence: any) {

    let dialogRef = this.dialog.open(SentenceDialogComponent);
    dialogRef.componentInstance.sentence = sentence;
    dialogRef.componentInstance.task = this.email.suggestedTasks.find((t) => t.task.id == sentence.id);

  }

}
