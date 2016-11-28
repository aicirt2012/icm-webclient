import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from '../models';

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
  createTask(email: any, name: string, idList?:string): Observable<any> {
    const options = {
      name: name,
      idList: idList
    };
    const path = `email/${email._id}/addTask`;
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, path, null, options);
  }
}
