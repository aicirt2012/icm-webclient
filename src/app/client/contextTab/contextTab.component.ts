import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'context-tab',
  styleUrls: ['./contextTab.component.css'],
  templateUrl: './contextTab.component.html'
})

export class ContextTabComponent {

  @Input() text: String;
  @Input() svgHeight: Number;

  constructor() {
  }

  ngOnInit() {
    console.log('tab context here'+this.text)
  }

}
