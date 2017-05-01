import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService} from '../../shared';

@Injectable()
export class WikiService {

  constructor(private http: HttpService) {    
  }
 
  search(query: string): Observable<any> {
    return this.http.get('wiki/search', {query: query}, null);
  }
 

}
