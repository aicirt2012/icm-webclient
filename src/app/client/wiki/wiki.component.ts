import { Component, Input, Output } from '@angular/core';
import { WikiService } from '../shared/wiki.service'

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html'
})

export class WikiComponent {
 
  constructor(ws: WikiService) {
    ws.search('Ulm');
  }

  ngOnInit() {
   
  }

}
