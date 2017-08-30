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
    return this.http.get('boxes', null, null);
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
    return this.http.post('boxes', null, body);
  }

  /**
   * Delete box by boxId
   * @param boxId: string
   */
  delBox(boxId: string): Observable<any> {
    console.log('delete box...');
    return this.http.delete('boxes/' + boxId, null, {boxId: boxId});
  }

  /**
   * Rename box by boxId and new short name
   * @param boxId
   * @param newBoxShortName: string
   */
  renameBox(boxId: string, newBoxShortName: string): Observable<any> {
    console.log('rename box...');
    return this.http.post('boxes/' + boxId + '/rename', null, {newBoxShortName: newBoxShortName});
  }

  /**
   * Sync boxes and emails via IMAP
   */
  syncAll(): Observable<any> {
    return this.http.get('boxes/syncAll', null, null);
  }

  /**
   * Add default boxes
   */
  addDefaultBoxes(boxList: any[]): any[] {

    boxList = boxList.map((box) => {
      let icon;
      switch (box.shortName) {
        case 'INBOX':
          icon = 'home';
          break;
        case 'Sent Mail':
          icon = 'send';
          break;
        case 'Drafts':
          icon = 'drafts';
          break;
        case 'Starred':
          icon = 'star';
          break;
        case 'Spam':
          icon = 'error';
          break;
        case 'Trash':
          icon = 'delete';
          break;
        default:
          icon = 'home';
          break;
      }
      ;
      box.icon = icon;
      box.children = [];
      return box;
    });

    return boxList;
  }

}
