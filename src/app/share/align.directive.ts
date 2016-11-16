import { NgModule, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[layout-align]'
})
export class AlignDirective {
  @Input('layout-align') align: string;
  horizontal: string;
  vertical: string;
  constructor(align: string) {
    const args = align.split(' ');
    this.horizontal = args[0];
    this.vertical = args[1];
  }

  // TODO: think about how to make this dynamic
//  @HostBinding(`class.layout-align-${this.horizontal}-${this.vertical}`)
  get alignment() {
    return true;
  }
}
