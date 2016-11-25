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
  public boxList: string[];
  public loading: boolean = true;
  public syncing: boolean = false;
  private currentBox: string = 'INBOX';
  public currentModalType: ModalType = null;
  private taskName: string = 'testName';
  private createdTask: any = null;

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
    });;

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

  getEmailBox(box?: string) {
    this.currentBox = box;
    this.loading = true;
    this._emailService
      .getEmailsWithPagination(box)
      .subscribe((data: any) => {
        this.emails = data.docs;
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
  createTask() {
    console.log(this.emails);
    this._taskService.createTask(this.emails[0], this.taskName, '582639655429c571aae95b37').subscribe((task) => {
      this.createdTask = task;
    })
  }

}
