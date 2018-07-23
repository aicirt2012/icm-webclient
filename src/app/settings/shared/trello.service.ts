import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../shared';

@Injectable()
export class TrelloService {

  constructor(private http: HttpService) {
  }

  public configure(email: string): Observable<any> {
    const body = {
      email: email,
      password: ""
    };
    return this.http.post('tasks/providers/trello/configure', null, body);
  }

}
