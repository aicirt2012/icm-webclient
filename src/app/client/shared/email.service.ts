import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {Email} from './email.model';
import {HttpService} from '../../shared';
import {SocketService} from '../../shared/services/socket.service';

@Injectable()
export class EmailService {

  constructor(private http: HttpService) {
  }

  /**
   * Search for emails with pagination
   * @param: boxId: string
   * @param: sort: string - ASC or DESC
   * @param: search: string - a search query
   * @param: lastEmailDate: Date: pivot for pagination
   */
  searchEmailsWithPagination(boxId = 'EMPTY', sort = 'DESC', search = '', lastEmailDate = new Date()): Observable<Email[]> {
    const params = {
      boxId: boxId,
      sort: sort,
      search: search,
      lastEmailDate: lastEmailDate
    };
    return this.http.get('emails/search', params, null);
  }

  /**
   * Send a new mail
   * @param: email: any - Mailobject
   */
  sendEmail(email: any): Observable<any> {
    return this.http.post('emails/send', null, email);
  }

  /**
   * Move email to an other box
   * @param: emailId: string
   * @param: newBoxId: string - destination box
   */
  moveEmail(emailId: string, newBoxId: string): Observable<any> {
    return this.http.post('emails/' + emailId + '/move', null, {newBoxId: newBoxId});
  }

  /**
   * Move email to trash
   * @param: emailId: string
   */
  moveEmailToTrash(emailId: string): Observable<any> {
    return this.http.post('emails/' + emailId + '/trash', null, {newBoxId: 0});
  }

  /**
   * Returns a single email
   * @param: id: string
   */
  getEmail(emailId: string): Observable<Email> {
    return this.http.get('emails/' + emailId, null, null);
  }

  /**
   * @param: emailId: string
   * @param: flags: string[] e.g. //seen
   */
  addFlags(emailId: string, flags: string[]): Observable<any> {
    return this.http.post('emails/' + emailId + '/flags', null, {flags: flags});
  }

  /**
   * @param: emailId: string
   * @param: flags: string[] e.g. //seen
   */
  delFlags(emailId: string, flags: string[]): Observable<any> {
    return this.http.delete('emails/' + emailId + '/flags', null, {flags: flags});
  }

  /**
   * Generates a new email
   */
  // TODO: improve address handling
  generateEmailForm(email: Email, type: string): any {

    if (type === 'new') {
      console.log('here');
      return {
        type: type
      }
    }

    console.log('from generate email form');
    console.log(email);

    const bodyHeader =
      '-------------------------------------------\n' +
      'From: ' + (email.from.length > 0 ? email.from[0].address : '') + '\n' +
      'Date: ' + email.date + '\n' +
      'Subject: ' + email.subject + '\n' +
      'To: ' + (email.to.length > 0 ? email.to[0].address : '') + '\n\n' +
      email.text;

    if (type === 'reply') {
      return {
        to: {
          name: email.from[0].name ? email.from[0].name : '',
          address: email.from.length > 0 ? email.from[0].address : ''
        },
        subject: `Re: ${email.subject}`,
        text: bodyHeader,
        type: type
      }
    } else if (type === 'forward') {
      return {
        subject: `Fw: ${email.subject}`,
        text: bodyHeader,
        type: type
      }
    }
  }

  /**
   * Creates a new draft email
   * @param: box: string - object,
   * @param: to: string - object,
   * @param: subject: string - Subject as string,
   * @param: msgData: string - Message Data as string,
   */
  appendEmail(boxId: any, to: any, subject: string, msgData: string): Observable<any> {
    console.log('start mail to draft');
    const body = {
      boxId: boxId,
      to: to,
      subject: subject ? subject : '',
      msgData: msgData ? msgData : '',
    };
    console.log('appending mail to draft', body);
    return this.http.post('emails/append', null, body);
  }

  /* FOR ENRON*/
  appendEnron(): Observable<any> {
   return this.http.post('emails/appendEnron', null, null);
  }
}
