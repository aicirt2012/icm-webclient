import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'highlight',
    pure: false
})
export class HighlightPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(text: string, search: string): any {
        return search ? this.sanitizer.bypassSecurityTrustHtml(text.replace(new RegExp(search, 'ig'), `<span style="color:red">${search}</span>`)) : text;
    }
}