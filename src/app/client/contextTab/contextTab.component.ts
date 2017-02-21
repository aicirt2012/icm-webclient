import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'context-tab',
  styleUrls: ['./contextTab.component.css'],
  templateUrl: './contextTab.component.html'
})

export class ContextTabComponent {

  @Input() text: String;
  @Input() svgHeight: number;
  textY: string = "0";
  rotateY: number;

  constructor() {
     this.textY = "10";//this.svgHeight - 5;
     this.rotateY =  70;    
  }

  getY() {
    return this.textY;
  }

  ngOnInit() {
    this.rotateY =  70;  
    console.log('tab context here'+this.svgHeight);
    console.log(this.rotateY);
  }

}
