import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {HttpService} from '../../shared';

@Injectable()
export class DashboardService {

  constructor(private http: HttpService) {
  }

  getTimeline(): Observable<any> {
    return this.http.get('dashboards/timeline', null, null);
  }

  getNetwork(): Observable<any> {
    return this.http.get('dashboards/network', null, null);
  }

  getStructure(): Observable<any> {
    return this.http.get('dashboards/structure', null, null);
  }

}
