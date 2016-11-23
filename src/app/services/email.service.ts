import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {Email} from '../models';
import {HttpService} from './http.service';
import C from '../constants';

@Injectable()
export class EmailService {
  private domain: string = 'email';

  constructor(private _httpService: HttpService) {
  }

  /*
   returns Object: {"boxlist": [{name: "INBOX", new: "2", total: "9"}]}
   */
  initMailbox(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, 'init', null, null);
  }

  /*
   @param: boxes: string[] - Boxnames as string array,
   returns Array: [Emails...]
   */
  getEmails(boxes: string[]): Observable<any[]> {
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'box', null, {boxes: boxes});
  }

}
