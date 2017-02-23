import { Component, Input, Output } from '@angular/core';
import { WikiService } from '../shared/wiki.service'

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html'
})

export class WikiComponent {
 
  private data: any;

  constructor(private ws: WikiService) {
  }

  ngOnInit() {
    this.ws.search('Ulm').subscribe(data=>{
      console.log(data);
      this.data = data;
    });
  }

}
