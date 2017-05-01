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
   * @lastEmailDate: Date: pivot for pagination   
   */
  searchEmailsWithPagination(boxId = 'NONE', sort = 'DESC', search = '', lastEmailDate = new Date()): Observable<any> {
    const options = {
      boxId: boxId,
      sort: sort,
      search: search,
      lastEmailDate: lastEmailDate
    };
    return this.http.get('email/search', options, null);
  }

  /**
   * Send a new mail
   * @param: email: any - Mailobject
   */
  sendMail(email: any): Observable<any> {
    return this.http.post('email/send', null, email);
  }

  /**
   * Move email to an other box
   * @param: emailId: string
   * @param: newBoxId: string - destination box
   */
  moveMail(emailId: string, newBoxId: string): Observable<any> {
    const body = {
      newBoxId: newBoxId
    };
    console.log('moving in service', body);
    return this.http.post('email/'+emailId+'/move', null, body);
  }
 
  /**
   * Sync boxes and emails via IMAP
   */
  syncAll(): Observable<any> {
    return this.http.get('email/syncAll', null, null);
  }

  /**
   * Returns a single email
   * @param: id: string
   */
  getSingleMail(emailId: string): Observable<any> {
    return this.http.get('email/'+emailId, null, null);
  }

  /**
   * @param: msgId: string
   * @param: flags: string[] e.g. //seen
   * @param: boxId: string 
   */
  addFlags(msgId: number, flags: string[], boxId: string): Observable<any> {
    const body = {
      msgId: msgId, //TODO Paul refactor that this paramter isnt needed anymore
      flags: flags,
      boxId: boxId
    };
    return this.http.post(`email/addFlags`, null, body);
  }

  /**
   * @param: msgId: string
   * @param: flags: string[] e.g. //seen
   * @param: boxId: string 
   */
  delFlags(msgId: number, flags: string[], boxId: string): Observable<any> {
    const body = {
      msgId: msgId, //TODO Paul refactor that this paramter isnt needed anymore
      flags: flags,
      boxId: boxId
    };
    return this.http.post(`email/delFlags`, null, body);
  }

  /**
   * Generates a new email
   */
  generateEmailForm(email: Email, type: string): any {
    const bodyHeader = `
-------------------------------------------
From: ${email.from[0].address}
Date: ${email.date}
Subject: ${email.subject}
To:${email.to[0].address}
${email.text}`;

    if (type == 'reply') {
      let receivers;
      if (email.from[0].name) {
        receivers = {
          name: email.from[0].name,
          address: email.from[0].address
        };
      } else {
        receivers = email.from[0].address;
      }
      return {
        to: receivers,
        subject: `Re: ${email.subject}`,
        text: bodyHeader
      }
    } else if (type == 'forward') {
      return {
        subject: `Fw: ${email.subject}`,
        text: bodyHeader
      }
    }
  } 

  /**
   * Creates a new draft email
   * @param: to: string - object,
   * @param: subject: string - Subject as string,
   * @param: msgData: string - Message Data as string,
   */
  appendMail(to: any, subject: string, msgData: string): Observable<any> {
    console.log('start mail to draft');
    const body = {
      to: to ? to[0] : '',
      subject: subject ? subject : '',
      msgData: msgData ? msgData : '',
    };
    console.log('appending mail to draft', body);
    return this.http.post('email/append', null, body);
  }

}
