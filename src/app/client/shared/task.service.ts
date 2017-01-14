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
  createTask(email: Email, task: any, idList?:string): Observable<any> {
    const options = {
      name: task.name,
      /*TODO: change naming */
      idList: task.idList.id,
      desc: task.desc,
      idMembers: [task.selectedMembers.id],
      due: task.date,
      sentences: email.sentences,
      sentenceId: task.task.id
    };
    const path = `email/${email._id}/addTask`;
    return this._httpService.generateRequest(RequestMethod.Post, this.domain, path, null, options);
  }

  updateTask(task: any): Observable<any> {
    const path = `${task.taskId}`;
    return this._httpService.generateRequest(RequestMethod.Put, this.domain, path, null, task);
  }

  getTaskByID(id :string): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, `/${id}`, null, null);
  }

  getListsForBoard(boardID :string, boards :any[]): Observable<any> {
    const options = {
      provider: 'trello'
    };
    const path = `boards/${boardID}/lists`;
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, 'boards', null, null);
  }

  getAllBoards(): Observable<any> {
    return this._httpService.generateRequest(RequestMethod.Get, this.domain, 'boards', null, null);
  }
}
