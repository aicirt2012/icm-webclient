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
  
  /**
   * Returns a list of all boxes
   */
  getBoxList(): Observable<any> {
    return this.http.get('box', null, null);
  }

  /**
   * Add box with short name and parentBoxId
   * @param boxShortName: string
   * @param parentBoxId: string
   */
  addBox(boxShortName: string, parentBoxId: string): Observable<any> {
    console.log('adding box...');
    const body = {
      boxName: boxShortName,
      parentBoxId: parentBoxId
    };
    return this.http.post('box', null, body);
  }

  /**
   * Delete box by boxId
   * @param boxId: string
   */
  delBox(boxId: string): Observable<any> {
    console.log('delete box...');
    const body = {
      boxId: boxId
    };
    return this.http.delete('box/'+boxId, null, body);
  }

  /**
   * Rename box by boxId and new short name 
   * @param boxId
   * @param newBoxShortName: string
   */
  renameBox(boxId: string, newBoxShortName: string): Observable<any> {
    console.log('rename box...');
    const body = {
      newBoxShortName: newBoxShortName
    };
    return this.http.post('box/'+boxId+'/rename', null, body);
  }

  /**
   * Sync boxes and emails via IMAP
   */
  syncAll(): Observable<any> {
    return this.http.get('box/syncAll', null, null);
  }
  
  


}
