import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService} from '../../shared';

@Injectable()
export class TranslateService {

  constructor(private http: HttpService) {    
  }
 
  translate(query: string): Observable<any> {
    const options = {
      query: query
    };
    return this.http.httpGET('translate', null, options, null);
  }
 

}
