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

  getEmails(boxes: string[]): Observable<any[]> {
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'box', null, {boxes: boxes});
  }

}
