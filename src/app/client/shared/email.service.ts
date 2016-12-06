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
  getEmailsWithPagination(box: string, page = 1, limit = 10): Observable<any> {
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
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, 'box', null, { boxes: boxes });
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
      return {
        to: email.from[0].address,
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

}
