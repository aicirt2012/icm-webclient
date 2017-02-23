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
    const me = this;
    this.ws.search(this.query).subscribe(data=>{
      this.text = data.teaser;  
     
      window.setTimeout(()=>{

        this.element.nativeElement.querySelectorAll('a').forEach((e)=> {     
            console.log(e);  
            e.addEventListener('click', function(){              
              me.query = e.getAttribute('title');
              console.log('say hallo'+me.query );
              me.search();
            });
            e.removeAttribute('href','#');
        });
        
      },100); 
    
  
    });
  }

  addEvents() {
    
  }

  ngAfterViewInit(){
    
  }

}
