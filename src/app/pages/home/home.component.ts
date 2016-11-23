import { Component, ViewChild } from '@angular/core';
import { AppState } from '../../app.service';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../models';
import { EmailService } from '../../services';

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
  private currentBox: string = '';

  constructor(private emailService: EmailService, public appState: AppState) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.loading = true;
    this.getBoxList().subscribe((data: any[]) => {
      this.boxList = data;
      console.log("boxlist:");
      console.log(this.boxList);
    }, error => {
      console.log(error)
    }, () => {
      console.log("Init done!")
      this.appState.set('boxList', this.boxList);
      this.getEmailBox('INBOX');
      console.log("State:");
      console.log(this.appState.get());
    });;

  }

  onRefresh(refresh: boolean) {
    console.log(`refresh...let's wait for 2 seconds...`);
  }

  getBoxList() {
    return this.emailService.initMailbox();
  }

  getEmailBox(box?: string) {
    this.currentBox = box;
    this.loading = true;
    this.emailService
      .getEmails([box])
      .subscribe((data: any[]) => {
        this.emails = data; this.loading = false;
      },
      error => {
        console.log(error)
      },
      () => { console.log(`${box} mails successfully loaded`) });
  }

}
