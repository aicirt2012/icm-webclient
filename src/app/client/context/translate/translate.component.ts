import { Component, Input} from '@angular/core';
import { TranslateService } from '../../shared/translate.service'

@Component({
  selector: 'translate',
  styleUrls: ['./translate.component.css'],
  templateUrl: './translate.component.html',
  host:
    {
      '(window:OnTranslationClick)': 'handleTranslationEvent($event)',
    }
})

export class TranslateComponent{

  private content: any;
  private word: string = 'heft';

  constructor(private ts: TranslateService) {
  }

  handleTranslationEvent(event:CustomEvent)
  {
    console.log("STARTED");
    this.word = event.detail;
    this.translate();
  }
  ngOnInit() {
  }

  translate(){
    this.ts.translate(this.word).subscribe(data=>{
      this.content = data;
    });
  }



}
