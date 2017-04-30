import { Injectable } from '@angular/core';
import { HttpService } from '../../shared';
import {RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Email} from './';

@Injectable()
export class TaskService {

  constructor(private _httpService: HttpService) { }

  /*
   @param: list: string ,
   returns Object: {TODO}
   */
  getAllTasks(list?:string): Observable<any> {
    const options = {
      idList: list
    };
    return this._httpService.get('task', options, null);
  }

  /*
  @param: query: string - Searchquery,
  returns Object: {"docs":[Emails...],"total": 3,"limit": 10,"page": 1,"pages": 1}
  */
  searchTasks(query = ''): Observable<any> {
    const options = {
      query: query
    };
    return this._httpService.get('task/search', options, null);
  }

  /*
  @param: emailAddresses: string[] - Searchquery,
  returns Object: {[card]}
  */
  searchCardsForMembers(emailAddresses): Observable<any> {
    const body = {
      emailAddresses: emailAddresses
    }
    return this._httpService.post('task/cards', null, body);
  }

  /*
  @param: mail: any - Mailobject {} TODO
  */
  createTask(email: Email, task: any, idList?:string): Observable<any> {
    const options = {
      name: task.name,
      /*TODO: change naming */
      idList: task.list.id,
      desc: task.desc,
      idMembers: task.selectedMembers.map((s) => s.id),
      due: task.date,
      sentences: email.sentences ? email.sentences : [],
      sentenceId: task.task ? task.task.id : ""
    };
    const path = `task/email/${email._id}/addTask`;
    return this._httpService.post(path, null, options);
  }

  updateTask(task: any): Observable<any> {
    const options = {
      name: task.name,
      /*TODO: change naming */
      idList: task.list.id,
      desc: task.desc,
      idMembers: task.selectedMembers.map((s) => s.id),
      due: task.date,
      closed: task.closed
    };
    return this._httpService.put('task/'+task.id, null, options);
  }

  getTaskByID(id :string): Observable<any> {
    return this._httpService.get('task/'+id, null, null);
  }

  getAllBoards(params?: any): Observable<any> {
    return this._httpService.get('task/boards', params, null);
  }

  linkTask(email: any, task: any) {
    const options = {
      taskId : task.card.id
    };
    const path = `task/email/${email._id}/linkTask`;
    return this._httpService.post(path, null, options);
  }

  unlinkTask(task: any) {
    const path = `task/${task.id}/unlink`;
     return this._httpService.put(path, null, null);
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
