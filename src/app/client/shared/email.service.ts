import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {Email} from './email.model';
import {HttpService} from '../../shared';
import {SocketService} from '../../shared/services/socket.service';

@Injectable()
export class EmailService {
  private domain: string = 'email';

  constructor(private _httpService: HttpService) {//, socketService: SocketService) {
  }

  /*
   @param: sort: string - ASC or DESC
   @param: boxId: string
   @param: boxId: string
   @param: search: string - a search query
   @lastEmailDate: Date: pivot for pagination
   */
  /*
  getEmailsWithPagination(boxId: string, sort = 'DESC', search = '', lastEmailDate = new Date()): Observable<any> {
    return this.searchEmailsWithPagination(boxId, sort, search, lastEmailDate);
  }
  */

  /*
   @param: sort: string - ASC or DESC
   @param: boxId: string
   @param: boxId: string
   @param: search: string - a search query
   @lastEmailDate: Date: pivot for pagination
   */
  searchEmailsWithPagination(boxId = 'NONE', sort = 'DESC', search = '', lastEmailDate = new Date()): Observable<any> {
    const options = {
      boxId: boxId,
      sort: sort,
      search: search,
      lastEmailDate: lastEmailDate
    };
    return this._httpService.httpGET(this.domain, 'search', options, null);
  }

  /*
   @param: mail: any - Mailobject {} TODO
   */
  sendMail(mail: any): Observable<any> {
    return this._httpService.httpPOST(this.domain, 'send', null, mail);
  }

  /*
   @param: emailId: string
   @param: newBoxId: string - destination box,
   */
  moveMail(emailId: string, newBoxId: string): Observable<any> {
    const body = {
      emailId: emailId,
      newBoxId: newBoxId
    };
    console.log('moving in service', body);
    return this._httpService.httpPOST(this.domain, 'move', null, body);
  }

  /*
   returns Object: {"boxlist": [{name: "INBOX", new: "2", total: "9"}]}
  updateMailboxList(): Observable<any> {
    return this._httpService.httpGET(this.domain, 'init', null, null);
  }
   */

  getBoxList(): Observable<any> {
    return this._httpService.httpGET(this.domain, 'box', null, null);
  }

  /*
   sync boxes and emails
   */
  syncAll(): Observable<any> {
    return this._httpService.httpGET(this.domain, 'syncAll', null, null);
  }

  /*
   @param: boxes: string[] - Boxnames as string array,
   returns Array: [Emails...]
  getEmails(boxes: string[]): Observable<any> {
    return this._httpService.httpPOST(this.domain, 'sync', null, {boxes: boxes});
  }
   */

  getEmails2(boxes: string[]): Observable<any> {
    return this._httpService.httpPOST(this.domain, 'sync2', null, {boxes: boxes});
  }

  /*
   @param: id: string
   returns Email
   */
  getSingleMail(id: string): Observable<any> {
    return this._httpService.httpGET(this.domain, `single/${id}`, null, null);
  }

  /*
   @param: msgId: string - msg id in box,
   @param: flags: string[] - array of flags to add to mail,
   @param: boxId: string - BoxId as string,
   */
  addFlags(msgId: number, flags: string[], boxId: string): Observable<any> {
    const body = {
      msgId: msgId,
      flags: flags,
      boxId: boxId
    };
    return this._httpService.httpPOST(this.domain, `addFlags`, null, body);
  }

  /*
   @param: msgId: string - msg id in box,
   @param: flags: string[] - array of flags to be deleted from mail,
   @param: boxId: string - BoxId as string,
   */
  delFlags(msgId: number, flags: string[], boxId: string): Observable<any> {
    const body = {
      msgId: msgId,
      flags: flags,
      boxId: boxId
    };
    return this._httpService.httpPOST(this.domain, `delFlags`, null, body);
  }

  /*
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

  /*
   @param: boxName: string
   */
  addBox(boxName: string): Observable<any> {
    console.log('adding box...');
    const body = {
      boxName: boxName
    };
    return this._httpService.httpPOST(this.domain, 'addBox', null, body);
  }

  /*
   @param: boxName: string
   */
  delBox(boxName: string): Observable<any> {
    console.log('removing box...');
    const body = {
      boxName: boxName
    };
    return this._httpService.httpPOST(this.domain, 'delBox', null, body);
  }

  /*
   @param: box: string - Boxname as string,
   @param: args: {mailbox: Boxname },
   @param: to: string - object,
   @param: from: string,
   @param: subject: string - Subject as string,
   @param: msgData: string - Message Data as string,
   */
  appendMail(box: string, to: any, from: any, subject: string, msgData: string): Observable<any> {
    console.log('start mail to draft');
    const body = {
      box: box,
      args: {mailbox: '[Gmail]/Drafts'},
      to: to ? to[0] : '',
      from: from,
      subject: subject ? subject : '',
      msgData: msgData ? msgData : '',
    };
    console.log('appending mail to draft', body);
    return this._httpService.httpPOST(this.domain, 'append', null, body);
  }

}
