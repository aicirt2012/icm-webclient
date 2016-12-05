import { Injectable } from '@angular/core';
import { HttpService } from '../../shared';
import {RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from './';

@Injectable()
export class TaskService {

  private domain: string = 'task';
  constructor(private _httpService: HttpService) { }

  /*
   @param: idList: string ,
   returns Object: {TODO}
   */
  getAllTasks(idList?:string): Observable<any> {
    console.log("here!!!");
    const options = {
      idList: idList
    };
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, '', options, null);
  }

  /*
  @param: query: string - Searchquery,
  returns Object: {"docs":[Emails...],"total": 3,"limit": 10,"page": 1,"pages": 1}
  */
  searchTasks(query = ''): Observable<any> {
    const options = {
      query: query
    };
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, 'search', options, null);
  }

  /*
  @param: mail: any - Mailobject {} TODO
  */
  createTask(email: Email, taskObject: any, idList?:string): Observable<any> {
    const options = {
      name: taskObject.subject,
      idList: idList
    };
    const path = `email/${email._id}/addTask`;
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, path, null, options);
  }

  /*
   @param: id: string
   returns Email
   */
  getTaskByID(id :string): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, `/${id}`, null, null);
  }

  createSuggestedTask(email: Email) {
    let peopleArray: any[] = [];
    let sender: string = "";
    let receiver: string = "";
    /* this has to be done for all names */
    if(email.from[0].name == "") sender = email.from[0].address;
    else sender = email.from[0].name;
    peopleArray.push(sender);

    if(email.to[0].name == "") receiver = email.to[0].address;
    else receiver = email.to[0].name;
    if (sender != receiver) peopleArray.push(receiver);

    let suggestedTaskObj = {
      subject: email.subject,
      text: email.text,
      people: peopleArray
    }
    return suggestedTaskObj;
  }
}
