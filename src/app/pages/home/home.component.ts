import { Component, ViewChild } from '@angular/core';
import { AppState } from '../../app.service';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../models';
import { EmailService, TaskService } from '../../services';
import { ModalType } from '../../constants';
import { Observable } from 'rxjs/Observable';
import { Observer} from 'rxjs/Observer';

@Component({
  selector: 'home',  // <home></home>
  providers: [
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public emails: Email[] = [];
  public email: Email = null;
  public boxList: string[];
  public loading: boolean = true;
  public syncing: boolean = false;
  private currentBox: string = 'INBOX';
  public currentModalType: ModalType = null;
  private taskName: string = 'testName';
  private createdTask: any = null;
  public loadedOnce: boolean = false;
  public mailView: boolean = true;
  public suggestedTask: any = {};
  public tasksForMail: any = [];

  constructor(private _emailService: EmailService, private _taskService: TaskService, public appState: AppState) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.loading = true;
    this.getBoxList().subscribe((data: any[]) => {
      this.boxList = data;
    }, error => {
      console.log(error)
    }, () => {
      console.log("Init done!")
      this.appState.set('boxList', this.boxList);
      this.getEmailBox(this.currentBox);
    });
  }

  onRefresh(refresh: boolean) {
    console.log(`refresh...let's wait for 2 seconds...`);
  }

  getBoxList() {
    return this._emailService.initMailbox();
  }

  syncBoxes(boxes: string[]) {
    this.syncing = true;
    this._emailService.getEmails([]).subscribe((data: any) => {
      this.getEmailBox(this.currentBox);
      this.syncing = false;
    });
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
        this.loadedOnce = true;
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

  getEmailBox(box?: string) {
    this.currentBox = box;
    //  this.loading = true;
    this._emailService
      .getEmailsWithPagination(box)
      .subscribe((data: any) => {
        this.emails = data.docs;
        console.log(this.emails);
        this.loading = false;
      },
      error => {
        console.log(error)
      },
      () => { console.log(`${box} mails successfully loaded`) });
  }

  openModal(type?: ModalType) {
    this.currentModalType = type;
  }

  closeModal() {
    this.currentModalType = null;
  }

  switchView(newView: string) {
    console.log("switching view to " + newView);
    if (this.mailView) this.mailView = false;
    else this.mailView = true;
  }

}
