import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'context-tab',
  styleUrls: ['./contextTab.component.css'],
  templateUrl: './contextTab.component.html'
})

export class ContextTabComponent {

  @Input() text: String;
  @Input() svgHeight: number;
  textY: number;
  rotateY: number;

  constructor() {
  }

  getY() {
    return this.textY;
  }

  ngOnInit() {    
    this.textY = this.svgHeight-5;
    this.rotateY = this.svgHeight -10;  
  }

}
