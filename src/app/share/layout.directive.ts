import { NgModule, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[layout]'
})
export class LayoutDirective {
  @Input() layout: string;

  @HostBinding('class.layout-row')
  get row() {
    return (this.layout === 'row');
  }

  @HostBinding('class.layout-column')
  get column() {
    return (this.layout === 'column');
  }
}
