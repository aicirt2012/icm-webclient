import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../shared';

@Injectable()
export class TaskService {

  constructor(private http: HttpService) {
  }

  public configureTrello(email: string): Observable<any> {
    const body = {
      email: email,
      password: ""
    };
    return this.http.post('tasks/providers/trello/configure', null, body);
  }

  public configureSociocortex(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post('tasks/providers/sociocortex/configure', null, body);
  }

  public setupSociocortex(): Observable<any> {
    return this.http.post('tasks/providers/sociocortex/setup', null, {});
  }

}
