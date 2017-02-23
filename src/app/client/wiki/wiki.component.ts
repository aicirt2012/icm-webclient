import { Component, Input, Output, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { WikiService } from '../shared/wiki.service'

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html'
})

export class WikiComponent implements AfterViewInit{
 
 // @ViewChild('wikicontent') er: ElementRef;
  private text: any;
  private query: string = 'Munich';

  constructor(private ws: WikiService, private element: ElementRef) {
  }

  ngOnInit() {
  }

  search(){
    this.ws.search(this.query).subscribe(data=>{
      this.text = '<button (click)="search()">dd</button>'+data.teaser;  
     
     window.setTimeout(()=>{
       this.element.nativeElement.querySelector('a').addEventListener('click', function(){
         console.log('say hallo');
       });
       
       const x = this.element.nativeElement.getElementsByTagName('a');
       
       var i;
      for (i = 0; i < x.length; i++) {
          console.log(x[i]);
          x[i].removeAttribute('href','#');
      }
      
     },100); 
    
  
    });
  }

  g(){
    console.log('hallooooooooooooooooo');
  }

  ngAfterViewInit(){
    
  }

}
