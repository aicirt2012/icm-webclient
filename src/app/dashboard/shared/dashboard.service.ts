import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService} from '../../shared';

@Injectable()
export class DashboardService {

  private path = '/dashboard';

  constructor(private _httpService: HttpService) {
  }

  getTimeline(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.path+'/timeline', null, null, null);
  }

  getNetwork(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.path+'/network', null, null, null);
  }

  getStructure(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.path+'/structure', null, null, null);
  }

}
