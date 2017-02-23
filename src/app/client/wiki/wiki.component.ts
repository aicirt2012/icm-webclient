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
      this.text = data.teaser;  
     
      window.setTimeout(()=>{

        const x = this.element.nativeElement.querySelectorAll('a');
        for (let i = 0; i < x.length; i++) {            
            let e = x[i];
            console.log(e);  
            e.addEventListener('click', function(){              
              this.query = e.getAttribute('title');
              console.log('say hallo'+this.query );
              //this.search();
            });
            e.removeAttribute('href','#');
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
