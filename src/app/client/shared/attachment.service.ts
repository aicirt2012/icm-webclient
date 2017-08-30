import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestOptions, ResponseContentType} from '@angular/http';
import {HttpService} from '../../shared';
import {SocketService} from '../../shared/services/socket.service';

@Injectable()
export class AttachmentService {

  constructor(private http: HttpService) {
  }

  downloadFile(id): Observable<Blob> {
    return this.http.getBlob('attachments/' + id + '/download');
  }

}
