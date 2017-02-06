import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {Email} from './email.model';
import {HttpService} from '../../shared';

@Injectable()
export class EmailService {
  private domain: string = 'email';

  constructor(private _httpService: HttpService) {
  }

  /*
  @param: box: string - Boxname as string,
  @param: params: any - {page:1, limit: 50}
  returns Object: {"docs":[Emails...],"total": 3,"limit": 10,"page": 1,"pages": 1}
  */
  getEmailsWithPagination(box: string, page = 1, limit = 25): Observable<any> {
    const options = {
      box: box,
      page: page,
      limit: limit
    };
    return this._httpService.httpGET(this.domain, null, options, null);
  }

  /*
  @param: box: string - Boxname as string,
  @param: params: any - {page:1, limit: 50, q: 'searchQuery'}
  returns Object: {"docs":[Emails...],"total": 3,"limit": 10,"page": 1,"pages": 1}
  */
  searchEmailsWithPagination(box: string, query = '', page = 1, limit = 25): Observable<any> {
    const options = {
      box: box,
      q: query,
      page: page,
      limit: limit
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
  @param: msgId: string - msg id in box,
  @param: srcBox: string - Boxname as string,
  @param: destBox: string - Boxname as string,
  */
  moveMail(msgId: string, srcBox: string, destBox: string): Observable<any> {
    const body = {
      msgId: msgId,
      srcBox: srcBox,
      destBox: destBox
    };
    console.log('moving in service',body);
    return this._httpService.httpPOST(this.domain, 'move', null, body);
  }

  /*
   returns Object: {"boxlist": [{name: "INBOX", new: "2", total: "9"}]}
   */
  updateMailboxList(): Observable<any> {
    return this._httpService.httpGET(this.domain, 'init', null, null);
  }

  /*
   @param: boxes: string[] - Boxnames as string array,
   returns Array: [Emails...]
   */
  getEmails(boxes: string[]): Observable<any> {
    return this._httpService.httpPOST(this.domain, 'sync', null, { boxes: boxes });
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
      @param: box: string - Boxname as string,
   */
  addFlags(msgId: number, flags: string[], boxName: string): Observable<any> {
      const body = {
        msgId: msgId,
        flags: flags,
        box: boxName
      };
    return this._httpService.httpPOST(this.domain, `addFlags`, null, body);
  }

  /*
      @param: msgId: string - msg id in box,
      @param: flags: string[] - array of flags to be deleted from mail,
      @param: box: string - Boxname as string,
   */
  delFlags(msgId: number, flags: string[], boxName: string): Observable<any> {
      const body = {
        msgId: msgId,
        flags: flags,
        box: boxName
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
      if(email.from[0].name) {
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
      args: {mailbox:'[Gmail]/Drafts'},
      to: to ? to[0] : '',
      from: from,
      subject: subject ? subject : '',
      msgData: msgData ? msgData : '',
    };
    console.log('appending mail to draft',body);
    return this._httpService.httpPOST(this.domain, 'append', null, body);
  }

}
