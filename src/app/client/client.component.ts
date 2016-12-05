import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../app.service';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from './shared';
import { EmailService, TaskService } from './shared';
import { Observable } from 'rxjs/Observable';
import { ModalType } from '../shared/constants';

@Component({
  selector: 'client',
  providers: [],
  styleUrls: ['./client.component.css'],
  templateUrl: './client.component.html'
})
export class ClientComponent {
  public emails: Email[] = [];
  public email: Email = null;
  public currentModalType: ModalType = null;
  public loading: boolean = true;
  private currentBox: Observable<string>;
  private currentId: Observable<string>;
  private taskName: string = 'testName';
  private createdTask: any = null;
  public suggestedTask: any = {};
  public tasksForMail: any = [];

  constructor(private _emailService: EmailService, private _taskService: TaskService, public appState: AppState, public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentId = this.route.params.map(params => params['emailId'] || 'None');
    this.currentBox = this.route.params.map(params => params['boxId'] || 'None');
    this.currentBox.subscribe((boxId) => {
      if (this.appState.get('boxList').length > 0) {
        boxId === 'None' ? '' : this.getEmailBox(this.appState.get('boxList').filter((box) => box.id == boxId)[0]);
      }
    });
    this.currentId.subscribe((emailId) => {
      emailId === 'None' ? '' : this.getSingleMail(emailId);
    });
    this.appState.getObservableState().subscribe((data) => {
        this.getEmailBox(this.appState.get('boxList')[0]);
    });
    if (!(this.appState.get('boxList').length > 0)) {
      this.loading = true;
      this.getBoxList().subscribe((data: any[]) => {
        this.appState.set('boxList', data);
        this.getEmailBox(data[0]);
      }, error => {
        console.log(error)
      }, () => {
        console.log("Init done!")
      });
    }
  }

  getBoxList() {
    return this._emailService.updateMailboxList();
  }

  getSingleMail(id?: string) {
    this._emailService
      .getSingleMail(id)
      .subscribe((data: any) => {
        this.email = data;
        /* now we can create a suggested Task object*/
        console.log(this.email);
        this.suggestedTask = this._taskService.createSuggestedTask(this.email);
        /* now we load the corresponding tasks */
        this.tasksForMail = [];
        this.getTasksForMail(this.email.tasks);
      },
      error => {
        console.log(error)
      },
      () => {
        console.log(`Message with ID: ${id} has been successfully loaded`)
      });
  }

  getTasksForMail(tasks: any) {
    if (tasks.length > 0) {
      for (let i = 0; i < tasks.length; i++) {
        this._taskService
          .getTaskByID(tasks[i].id)
          .subscribe((data: any) => {
            console.log(data);
            this.tasksForMail.push(data);
          }, error => {
            console.log(error)
          }, () => {
            console.log("task loaded!")
          });
      }
    }
  }

  getEmailBox(box?: any) {
    console.log(box);
    this._emailService
      .getEmailsWithPagination(box.name)
      .subscribe((data: any) => {
        this.emails = data.docs.map((email) => {
          email.route = `/box/${email.box.id}/${email._id}`;
          return email;
        });
        console.log(this.emails);
        this.loading = false;
      },
      error => {
        console.log(error)
      },
      () => { console.log(`Mails successfully loaded`) });
  }

  openModal(type?: ModalType) {
    this.currentModalType = type;
  }

  closeModal() {
    this.currentModalType = null;
  }

}
