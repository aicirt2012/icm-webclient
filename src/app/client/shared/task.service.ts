import { Injectable } from "@angular/core";
import { HttpService } from "../../shared";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TaskService {

  constructor(private http: HttpService) {
  }

  createTask(task: any): Observable<any> {
    return this.http.post('tasks', null, task);
  }

  readTask(id: string): Observable<any> {
    return this.http.get('tasks/' + id, null, null);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put('tasks/' + task.id, null, task);
  }

  deleteTask(task: any): Observable<any> {
    return this.http.delete('tasks/' + task.id, null, task);
  }

  static getParameter(task: any, parameterName: string): any {
    if (task.parameters)
      task.parameters.forEach(parameter => {
        if (parameter.name === parameterName)
          return parameter.value;
      });
    return undefined;
  }

  static isTaskCompleted(task: any) {
    if (task.provider === "trello") {
      return !!TaskService.getParameter(task, 'closed');
    } else if (task.provider === "sociocortex") {
      const state = TaskService.getParameter(task, 'state');
      return state === 'COMPLETED' || state === 'TERMINATED';
    }
  }

}
