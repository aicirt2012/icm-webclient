import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {Email} from './email.model';
import {HttpService} from '../../shared';
import {SocketService} from '../../shared/services/socket.service';

@Injectable()
export class BoxService {

  constructor(private http: HttpService) {
  }

  
  /*
    get all boxes
   */
  getBoxList(): Observable<any> {
    return this.http.get('email/box', null, null);
  }

  /*
   @param: boxShortName: string
   */
  addBox(boxShortName: string, parentBoxId: string): Observable<any> {
    console.log('adding box...');
    const body = {
      boxName: boxShortName,
      parentBoxId: parentBoxId
    };
    return this.http.post('email/addBox', null, body);
  }

  /*
   @param: boxName: string
   */
  delBox(boxId: string): Observable<any> {
    console.log('removing box...');
    const body = {
      boxId: boxId
    };
    return this.http.post('email/delBox', null, body);
  }

  /*
   @param: newBoxShortName: string
   */
  renameBox(oldBoxId: string, newBoxShortName: string): Observable<any> {
    console.log('adding box...');
    const body = {
      oldBoxId: oldBoxId,
      newBoxShortName: newBoxShortName
    };
    return this.http.post('email/renameBox', null, body);
  }


}
