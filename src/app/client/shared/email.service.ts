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
  getEmailsWithPagination(box: string, page = 1, limit = 50): Observable<any> {
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
  searchEmailsWithPagination(query = '', page = 1, limit = 10): Observable<any> {
    const options = {
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
   @param: msgId: string - msg id in box
   */
  deleteMail(msgId: string): Observable<any> {
    const body = {
      msgId: msgId,
    };
    return this._httpService.generateRequest(RequestMethod.Delete, this.domain, 'delete', null, body);
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
  */
  generateEmailForm(email: Email, type: string): any {
    const bodyHeader = `
-------------------------------------------
From: ${email.from[0].address}
Date: ${email.date}
Subject: ${email.subject}
To:${email.to[0].address}
${email.text}`;

    if (type === 'reply') {
      /* tag input requires an array as input */
      /*let receivers = [];
      receivers.push(email.from[0].address);*/
      let receivers = email.from[0].address;
      return {
        to: receivers,
        subject: `Re: ${email.subject}`,
        text: bodyHeader
      }
    } else if (type === 'forward') {
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
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'addBox', null, body);
  }

  /*
   @param: boxName: string
   */
  deleteBox(boxName: string): Observable<any> {
    console.log('removing box...');
    const body = {
      boxName: boxName
    };
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'delBox', null, body);
  }

}
