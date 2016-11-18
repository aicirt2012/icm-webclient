import { Component } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../models/email.model';
import { EmailService } from '../../services/email.service'

@Component({
  selector: 'list',  // <list></list>

  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html'
})
export class ListComponent {

    public emails: Email[];

  constructor(private emailService: EmailService) {
    //some random stuff

  }
  ngOnInit() {
    console.log('hello `list` component');
    this.emailService
      .getAllMailsInbox()
      .subscribe((data: any) => this.emails = data,
      error => console.log(error),
      () => console.log("Inbox mails successfully loaded"));
  }

}
