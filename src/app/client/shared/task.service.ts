import { Injectable } from "@angular/core";
import { HttpService } from "../../shared";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TaskService {

  constructor(private http: HttpService) {
  }

  // ---- COMMON ----

  createTask(task: any): Observable<any> {
    return this.http.post('tasks', null, task);
  }

  readTask(id: string): Observable<any> {
    return this.http.get('tasks/' + id, null, null);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put('tasks/' + task._id, null, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete('tasks/' + taskId, null, null);
  }

  linkTask(task: any): Observable<any> {
    return this.http.post('tasks/link', null, task);
  }

  unlinkTask(task: any): Observable<any> {
    return this.http.post('tasks/' + task._id + '/unlink', null, task);
  }

  // ---- TRELLO ----

  getTrelloTask(taskId: string): Observable<any> {
    return this.http.get('tasks/providers/trello/tasks/' + taskId, null, null);
  }

  getTrelloBoards(): Observable<any> {
    return this.http.get('tasks/providers/trello/boards', null, null);
  }

  getTrelloTasks(listId: string): Observable<any> {
    return this.http.get('tasks/providers/trello/lists/' + listId + '/tasks', null, null);
  }

  getTrelloMembers(boardId: string): Observable<any> {
    return this.http.get('tasks/providers/trello/boards/' + boardId + '/members', null, null);
  }

  archiveTrelloTask(taskId: string): Observable<any> {
    return this.http.get('tasks/providers/trello/archive/' + taskId, null, null);
  }

  // ---- SOCIOCORTEX ----

  getSociocortexWorkspaces(): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/workspaces', null, null);
  }

  getSociocortexCases(workspaceId: string): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/workspaces/' + workspaceId + '/cases', null, null);
  }

  getSociocortexCase(caseId: string): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/cases/' + caseId, null, null);
  }

  getSociocortexTasks(caseId: string): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/cases/' + caseId + '/tasks', null, null);
  }

  getSociocortexMembers(taskId: string): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/tasks/' + taskId + '/members', null, null);
  }

  getSociocortexTask(taskId: string): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/tasks/' + taskId, null, null);
  }

  completeSociocortexTask(taskId: string): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/complete/' + taskId, null, null);
  }

  terminateSociocortexTask(taskId: string): Observable<any> {
    return this.http.get('tasks/providers/sociocortex/terminate/' + taskId, null, null);
  }

  // ___ helpers ____

  static getParameter(task: any, parameterName: string): any {
    let value = undefined;
    if (task.parameters)
      task.parameters.some(parameter => {
        if (parameter.name === parameterName) {
          value = parameter.value;
          return true;
        }
      });
    return value;
  }

  static formatDate(date: any) {
    if (!date)
      return "";
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

}
