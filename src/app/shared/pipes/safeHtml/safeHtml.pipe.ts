import { DomSanitizer } from '@angular/platform-browser';
import { Pipe } from '@angular/core';

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}
