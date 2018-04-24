import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService} from '../../shared';

@Injectable()
export class TranslateService {

  constructor(private http: HttpService) {    
  }
 
  translate(word: string): Observable<any> {
    return this.http.get('translate', {word: word}, null);
  }
 

}
