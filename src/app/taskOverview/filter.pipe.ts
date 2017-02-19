import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
    pure: false
})
export class SortingPipe implements PipeTransform {
    transform(items: any[], args: any[]): any[] {
        items.sort((a: any, b: any) => {
            if (new Date(a.dateLastActivity) > new Date(b.dateLastActivity)) {
                return -1;
            } else if (new Date(a.dateLastActivity) < new Date(b.dateLastActivity)) {
                return 1;
            } else {
                return 0;
            }
        });
        return items;
    }
}