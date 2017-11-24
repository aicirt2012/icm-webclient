import { MatDialog } from '@angular/material';
import { SentenceDialogComponent } from './sentenceDialog'; //sentenceDialog.component';
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../shared';
import { AttachmentService } from '../../shared';
import { saveAs as importedSaveAs } from "file-saver";
import { AuthService } from '../../../shared/services/auth.service';
import C from '../../../shared/constants';

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

  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private attachmentService: AttachmentService,
    private authService: AuthService
    ) {
  }

  ngOnChanges() {
    if (this.email.html) {
      this.replaceInlineAttachmentsURL();
      this.email.html = typeof this.email.html === 'string' ? this.sanitizer.bypassSecurityTrustHtml(this.email.html) : this.email.html;
    }
  }

  replaceInlineAttachmentsURL() {
    if (typeof this.email.html === 'string') {
      this.email.html = this.email.html.replace(`ATTACHMENT_POINT/`, `${C.server}/attachments/`);
      this.email.html = this.email.html.replace(`TOKEN_POINT`, this.authService.token);
    }
  }

  highlight(id: any, highlight: boolean) {
    this.highlightSentence.emit({id: id, highlight: highlight});
  }

  onIframeLoad(iframe: HTMLIFrameElement, topSection: HTMLElement) {
    this.adjustIframeSize(iframe, topSection);
    this.applyAnnotationFramework(iframe);
  }

  adjustIframeSize(iframe: HTMLIFrameElement, topSection: HTMLElement) {
    if (iframe) {
      iframe.style.height = 'inherit';
      const height = iframe.contentDocument.body.scrollHeight;
      iframe.style.height = height + 100 + 'px';
      if (this.wrapper && height > this.wrapper.nativeElement.clientHeight) {
        this.wrapper.nativeElement.style.height = (height + topSection.clientHeight) + 'px';
      } else if (this.wrapper) {
        this.wrapper.nativeElement.style.height = 'inherit';
      }
    }
  }

  applyAnnotationFramework(iframe: HTMLIFrameElement) {
    let scriptElement, linkElement;

    // head
    // scriptElement = iframe.contentDocument.createElement("script");
    // scriptElement.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");
    // iframe.contentDocument.head.appendChild(scriptElement);
    // scriptElement = iframe.contentDocument.createElement("script");
    // scriptElement.setAttribute("src", "http://assets.annotateit.org/annotator/v1.2.10/annotator-full.min.js");
    // iframe.contentDocument.head.appendChild(scriptElement);
    // // FIXME annotator.js produces jQuery not found error when integrated into ICM
    // linkElement = iframe.contentDocument.createElement("link");
    // linkElement.setAttribute("rel", "stylesheet");
    // linkElement.setAttribute("href", "http://assets.annotateit.org/annotator/v1.2.10/annotator.min.css");
    // iframe.contentDocument.head.appendChild(linkElement);

    // body
    // scriptElement = iframe.contentDocument.createElement("script");
    // scriptElement.setAttribute("type", "text/javascript");
    // scriptElement.setAttribute("innerHTML", "jQuery(function ($) {\n" +
    //   "    $('.body').annotator();\n" +
    //   "});");
    // iframe.contentDocument.body.appendChild(scriptElement);
    scriptElement = iframe.contentDocument.createElement("script");
    scriptElement.setAttribute("type", "text/javascript");
    scriptElement.innerHTML = "console.log(\"test!\");";
    iframe.contentDocument.body.appendChild(scriptElement);

  }

  sentenceContainsTask(sentenceId: any) {
    return this.email.suggestedTasks.find((t) => t.task.id == sentenceId);
  }

  openSentenceDialog(sentence: any) {

    let dialogRef = this.dialog.open(SentenceDialogComponent);
    dialogRef.componentInstance.sentence = sentence;
    dialogRef.componentInstance.task = this.email.suggestedTasks.find((t) => t.task.id == sentence.id);

  }

  downloadFile(id: any, filename: string) {
    this.attachmentService.downloadFile(id)
      .subscribe((blob) => {
        importedSaveAs(blob, filename);
      });
  }

}
