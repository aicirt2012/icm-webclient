import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestMethod} from '@angular/http';
import {Email} from './email.model';
import {HttpService} from '../../shared';
import {SocketService} from '../../shared/services/socket.service';

@Injectable()
export class EmailService {

  constructor(private _httpService: HttpService) {
  }

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
    return this._httpService.get('email/search', options, null);
  }

  /*
   @param: mail: any - Mailobject {} TODO
   */
  sendMail(mail: any): Observable<any> {
    return this._httpService.post('email/send', null, mail);
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
    return this._httpService.post('email/move', null, body);
  }

  /*
    get all boxes
   */
  getBoxList(): Observable<any> {
    return this._httpService.get('email/box', null, null);
  }

  /*
   sync boxes and emails
   */
  syncAll(): Observable<any> {
    return this._httpService.get('email/syncAll', null, null);
  }

  /*
   @param: id: string
   returns Email
   */
  getSingleMail(id: string): Observable<any> {
    return this._httpService.get(`email/single/${id}`, null, null);
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
    return this._httpService.post(`email/addFlags`, null, body);
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
    return this._httpService.post(`email/delFlags`, null, body);
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
   @param: boxShortName: string
   */
  addBox(boxShortName: string, parentBoxId: string): Observable<any> {
    console.log('adding box...');
    const body = {
      boxName: boxShortName,
      parentBoxId: parentBoxId
    };
    return this._httpService.post('email/addBox', null, body);
  }

  /*
   @param: boxName: string
   */
  delBox(boxId: string): Observable<any> {
    console.log('removing box...');
    const body = {
      boxId: boxId
    };
    return this._httpService.post('email/delBox', null, body);
  }

  /*
   @param: newBoxShortName: string
   */
  renameBox(oldBoxId: string, newBoxShortName: string): Observable<any> {
    console.log('adding box...');
    const body = {
      oldBoxId: oldBoxId,
      newBoxShortName: newBoxShortName
    };
    return this._httpService.post('email/renameBox', null, body);
  }

  /*
   @param: to: string - object,
   @param: subject: string - Subject as string,
   @param: msgData: string - Message Data as string,
   */
  appendMail(to: any, subject: string, msgData: string): Observable<any> {
    console.log('start mail to draft');
    const body = {
      to: to ? to[0] : '',
      subject: subject ? subject : '',
      msgData: msgData ? msgData : '',
    };
    console.log('appending mail to draft', body);
    return this._httpService.post('email/append', null, body);
  }

}
