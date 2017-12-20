import { MatDialog } from '@angular/material';
import { SentenceDialogComponent } from './sentenceDialog'; //sentenceDialog.component';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ng2-bootstrap';
import { AttachmentService, Email } from '../../shared';
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

  constructor(private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private attachmentService: AttachmentService,
              private authService: AuthService) {
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
    this.injectAnnotationFramework(iframe);

    function handleTranslation(e: CustomEvent) {
      document.dispatchEvent(new CustomEvent("OnTranslationClick", {"detail": e.detail}));
    }

    function handleSearch(e: CustomEvent) {
      document.dispatchEvent(new CustomEvent("OnSearchClick", {"detail": e.detail}));
    }

    iframe.contentDocument.addEventListener("OnTranslationClick", handleTranslation, false);
    iframe.contentDocument.addEventListener("OnSearchClick", handleSearch, false);
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

  injectAnnotationFramework(iframe: HTMLIFrameElement) {
    // include icons used in tooltips
    let styleElement = iframe.contentDocument.createElement("link");
    styleElement.setAttribute("rel", "stylesheet");
    styleElement.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
    iframe.contentDocument.head.appendChild(styleElement);

    // include styling for custom extensions
    styleElement = iframe.contentDocument.createElement("link");
    styleElement.setAttribute("rel", "stylesheet");
    styleElement.setAttribute("href", "assets/css/annotator.custom-extensions.css");
    iframe.contentDocument.head.appendChild(styleElement);

    // include annotator custom extensions
    let scriptElement = iframe.contentDocument.createElement("script");
    scriptElement.setAttribute("src", "assets/js/annotator.custom-extensions.js");
    iframe.contentDocument.body.appendChild(scriptElement);

    // include annotator framework and initialize
    scriptElement = iframe.contentDocument.createElement("script");
    scriptElement.setAttribute("src", "assets/js/annotator.js");
    let scriptValue = "annotatorCustomExtensions.annotations = " + this.getAnnotationsAsString() + ";";
    scriptValue += "annotatorCustomExtensions.initAnnotator();";
    scriptElement.setAttribute("onload", scriptValue);   // call init routine after loading
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

  private getAnnotationsAsString() {
    let annotations = this.email.annotations;
    let annotationString = "[";
    for (let index in annotations) {
      let annotation = annotations[index];
      if (annotation['nerType'] === "PERSON" || annotation['nerType'] === "ORGANIZATION" || annotation['nerType'] === "LOCATION") {
        if (annotationString.length > 1) {
          annotationString += ",";
        }
        annotationString += "{";
        annotationString += "\"quote\": \"" + annotation['value'] + "\",";
        annotationString += "\"text\": \"" + annotation['nerType'] + "\",";
        annotationString += "\"ranges\": " + this.getRangesAsString(annotation);
        annotationString += "}";
      }
    }
    annotationString += "]";
    return annotationString;
  }

  private getRangesAsString(annotation) {
    let rangesString = "[";
    for (let index in annotation['ranges']) {
      let range = annotation['ranges'][index];
      if (rangesString.length > 1) {
        rangesString += ",";
      }
      rangesString += "{";
      rangesString += "\"start\": \"" + range['xPathStart'] + "\",";
      rangesString += "\"startOffset\": " + range['offsetStart'] + ",";
      rangesString += "\"end\": \"" + range['xPathEnd'] + "\",";
      rangesString += "\"endOffset\": " + range['offsetEnd'];
      rangesString += "}";
    }
    rangesString += "]";
    return rangesString;
  }

}
