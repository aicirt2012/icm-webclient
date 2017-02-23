import { Component, Input, Output } from '@angular/core'; //ViewChild ElementRef
import { WikiService } from '../shared/wiki.service'

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html'
})

export class WikiComponent {
 
 // @ViewChild('wiki-content') er: ElementRef;
  private text: any;
  private query: string;

  constructor(private ws: WikiService) {
  }

  ngOnInit() {
  }

  search(){
    this.ws.search(this.query).subscribe(data=>{
      this.text = '<button (click)="search()">dd</button>'+data.teaser;  
    // console.log(this.er.nativeElement.query('a'))
    });
  }

}
