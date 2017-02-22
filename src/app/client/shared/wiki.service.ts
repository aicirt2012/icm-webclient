import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService} from '../../shared';

@Injectable()
export class WikiService {
  private domain: string = 'wiki/search';

  constructor(private http: HttpService) {
    console.log('wiki contsrutor');
    this.search('Ulm');
  }

 
  search(query: string): Observable<any> {
    const options = {
      query: query
    };
    return this.http.httpGET(this.domain, null, options, null);
  }


  

 

}
