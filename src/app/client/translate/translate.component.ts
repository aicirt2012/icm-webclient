import { Component, Input} from '@angular/core';
import { TranslateService } from '../shared/translate.service'

@Component({
  selector: 'translate',
  styleUrls: ['./translate.component.css'],
  templateUrl: './translate.component.html'
})

export class TranslateComponent{
 
  private content: any;
  private word: string = 'Tree';

  constructor(private ts: TranslateService) {
  }

  ngOnInit() {
  }

  translate(){
    this.ts.translate(this.word).subscribe(data=>{
      console.log(JSON.stringify(data));
      this.content = data;

    });
  }

  

}
