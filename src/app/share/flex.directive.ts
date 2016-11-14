import { NgModule, Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[flex]'
})
export class FlexDirective {
  @Input() shrink: number = 1;
  @Input() grow: number = 1;
  @Input() flex: string;

  @HostBinding('style.flex')
  get style() {
    return `${this.grow} ${this.shrink} ${this.flex === '' ? '0' : this.flex}%`;
  }

  @HostBinding('style.display')
  get displayWebkit() {
    return '-webkit-flex';
  }
  
  @HostBinding('style.display')
  get display() {
    return 'flex';
  }

}
