import { Component, Input} from '@angular/core';
import { TranslateService } from '../shared/translate.service'

@Component({
  selector: 'translate',
  styleUrls: ['./translate.component.css'],
  templateUrl: './translate.component.html'
})

export class TranslateComponent{
 
  private content: any;
  private query: string = 'Munich';

  constructor(private ts: TranslateService) {
  }

  ngOnInit() {
  }

  translate(){
    this.ts.translate(this.query).subscribe(data=>{
      

    });
  }

  

}
