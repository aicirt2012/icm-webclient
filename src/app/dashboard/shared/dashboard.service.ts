import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService, AuthService} from '../../shared';

@Injectable()
export class DashboardService {

  private path = '/dashboard';

  constructor(private _httpService: HttpService, private _authService: AuthService) {
  }

  getTimeline(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.path+'/timeline', null, null, null);
  }

  getNetwork(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.path+'/network', null, null, null);
  }


}
