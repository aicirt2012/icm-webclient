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
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, null, options, null);
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
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, 'search', options, null);
  }

  /*
  @param: mail: any - Mailobject {} TODO
  */
  sendMail(mail: any): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'send', null, mail);
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
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'move', null, body);
  }

  /*
   returns Object: {"boxlist": [{name: "INBOX", new: "2", total: "9"}]}
   */
  updateMailboxList(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, 'init', null, null);
  }

  /*
   @param: boxes: string[] - Boxnames as string array,
   returns Array: [Emails...]
   */
  getEmails(boxes: string[]): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'sync', null, { boxes: boxes });
  }

  /*
   @param: id: string
   returns Email
   */
  getSingleMail(id: string): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, `single/${id}`, null, null);
  }

  /*
      @param: msgId: string - msg id in box,
      @param: flags: string[] - array of flags to add to mail,
      @param: boxName: string - Boxname as string,
   */
  addFlags(msgId: string, flags: string[], boxName: string): Observable<any> {
      const body = {
        msgId: msgId,
        flags: flags,
        boxName: boxName
      };
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, `addFlags`, null, body);
  }

  /*
      @param: msgId: string - msg id in box,
      @param: flags: string[] - array of flags to be deleted from mail,
      @param: boxName: string - Boxname as string,
   */
  delFlags(msgId: string, flags: string[], boxName: string): Observable<any> {
      const body = {
        msgId: msgId,
        flags: flags,
        boxName: boxName
      };
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, `delFlags`, null, body);
  }

  /*
  */
  generateEmailForm(email: Email, type: number): any {
    console.log('emailService,Email',email);
    const bodyHeader = `
-------------------------------------------
From: ${email.from[0].address}
Date: ${email.date}
Subject: ${email.subject}
To:${email.to[0].address}
${email.text}`;

    if (type == 1) {
      /* tag input requires an array as input */
      /*let receivers = [];
      receivers.push(email.from[0].address);*/
      let receivers = email.from[0].address;
      console.log('REPLY TYPE');
      return {
        to: receivers,
        subject: `Re: ${email.subject}`,
        text: bodyHeader
      }
    } else if (type == 2) {
      return {
        subject: `Fw: ${email.subject}`,
        text: bodyHeader
      }
    }

  }

}
