import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService} from '../../shared';

@Injectable()
export class NetworkService {

  constructor(private http: HttpService) {    
  }
 
  public search(query: string): Observable<any> {
    return this.http.get('contacts/search', {query: query}, null);
  }

  public list(): Observable<any> {
    return this.http.get('contacts', null, null);
  }

  public getFullContact(id: string): Observable<any> {
    return this.http.get('contacts/'+id, null, null);
  }

  public sync(): Observable<any> {
    return this.http.post('contacts/sync', null, null);
  }
 

}
