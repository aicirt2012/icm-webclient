import { Component, Input} from '@angular/core';
import { TranslateService } from '../../shared/translate.service'

@Component({
  selector: 'translate',
  styleUrls: ['./translate.component.css'],
  templateUrl: './translate.component.html',

})

export class TranslateComponent{

  private content: any;
  public _word: string = 'heft';

  @Input()
  set word(word: string) {
    word = word.trim();
    if(word) {
      this._word = word
      this.translate();
    }
    else this._word =  'Please select text to translate';
  }
  get word(): string { return this._word; }


  constructor(private ts: TranslateService) {
  }

  ngOnInit() {
  }

  translate(){
    this.ts.translate(this._word).subscribe(data=>{
      this.content = data;
    });
  }

}
