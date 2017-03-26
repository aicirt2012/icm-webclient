import { Component, Input, ElementRef} from '@angular/core';
import { WikiService } from '../shared/wiki.service'

@Component({
  selector: 'wiki',
  styleUrls: ['./wiki.component.css'],
  templateUrl: './wiki.component.html'
})

export class WikiComponent{
 
  private content: any;
  private query: string = 'Munich';
  private loading: boolean = false;

  constructor(private ws: WikiService, private element: ElementRef) {
  }

  ngOnInit() {
  }

  search(){
    this.loading = true;
    this.ws.search(this.query).subscribe(data=>{
      this.content = data.teaser;
      this.loading = false;       
      window.setTimeout(()=>{
        this.addEvents();       
      },10);
    });
  }

  addEvents() {
    const me = this;
    me.element.nativeElement.querySelectorAll('.wiki-link').forEach((e)=> {      
      e.addEventListener('click', ()=>{              
        me.query = e.getAttribute('title');
        me.search();
      });
      const baseStyle = 'color:#666;';
      const hoverStyle = 'color:red; cursor:pointer;';
      e.setAttribute('style', baseStyle);
      e.addEventListener('mouseover', ()=>{
        e.setAttribute('style', hoverStyle);
      });
      e.addEventListener('mouseout', ()=>{
        e.setAttribute('style', baseStyle);
      });            
    });
  }


}
