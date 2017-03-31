import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'highlight',
    pure: false
})
export class HighlightPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(text: string, [search]): any {
        console.log('filter')
        return search ? this.sanitizer.bypassSecurityTrustHtml(text.replace(new RegExp(search, 'i'), `<span style="color:red">${search}</span>`)) : text;
    }
}