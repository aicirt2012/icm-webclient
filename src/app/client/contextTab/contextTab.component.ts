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
  transform: string;

  constructor() {
  }

  ngOnInit() {    
    this.textY = this.svgHeight-15;
    this.transform = "rotate(-90 10, "+(this.svgHeight -20)+")";  
  }

}
