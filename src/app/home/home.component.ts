import { Component, ViewChild } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import { NavBarComponent } from './navbar';
import { Email } from '../models/email.model';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'home',  // <home></home>
  providers: [
    Title
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  /* need model for email */
  //public emails: Email[];
  //public firstMail: Email;

  //  @ViewChild('childModal') public childModal: ModalDirective;

  // Set our default values
  localState = { value: '' };

  constructor(private emailService: EmailService, public appState: AppState, public title: Title) {

  }

  public disabled(date: Date, mode: string): boolean {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  }

  /*
    public showChildModal(): void {
      this.childModal.show();
    }

    public hideChildModal(): void {
      this.childModal.hide();
    }
  */
  ngOnInit() {
    console.log('hello `Home` component');
    /*this.emailService
      .getAllMailsInbox()
      .subscribe((data: any) => this.emails = data,
      error => console.log(error),
      () => this.storeMails(this.emails));

    this.emailService
                .getAllMails()
                .subscribe((data:any) => this.emails = data,
                    error => console.log(error),
                    () => this.storeMails(this.emails));*/
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
