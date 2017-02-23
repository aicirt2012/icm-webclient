import { Component, Input, ElementRef} from '@angular/core';
import { WikiService } from '../shared/wiki.service'

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html'
})

export class WikiComponent{
 
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
        this.addEvents();       
      },10);
    });
  }

  addEvents() {
    const me = this;
    me.element.nativeElement.querySelectorAll('.wiki-link').forEach((e)=> {      
      e.addEventListener('click', function(){              
        me.query = e.getAttribute('title');
        me.search();
      });
      e.removeAttribute('href','#');
      e.setAttribute('style', 'color:#666;');
    });
  }


}
