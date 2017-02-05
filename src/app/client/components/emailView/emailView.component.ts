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

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges() {
    if (this.email.html) {
      this.email.html = this.sanitizer.bypassSecurityTrustHtml(this.email.html);
    }
  }

  highlight(id: any, highlight: boolean) {
    this.highlightSentence.emit({ id: id, highlight: highlight })
  }

  adjustIframeSize(iframe: HTMLIFrameElement) {
    if (iframe) {
      iframe.style.height = 'inherit';
      const height = iframe.contentDocument.body.scrollHeight;
      iframe.style.height = height + 'px';
      if (this.wrapper && height > this.wrapper.nativeElement.clientHeight) {
        this.wrapper.nativeElement.style.height = (height + 200) + 'px';
      } else if(this.wrapper) {
        this.wrapper.nativeElement.style.height = 'inherit';
      }
    }
  }

}
