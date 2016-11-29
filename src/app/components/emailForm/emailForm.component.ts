import { Component, Input, EventEmitter, Output } from '@angular/core';
import { EmailForm } from '../../models';
@Component({
  selector: 'email-form',
  styleUrls: ['./emailForm.component.css'],
  templateUrl: './emailForm.component.html'
})
export class EmailFormComponent {
  @Output() sendEmail = new EventEmitter<any>();
  @Input() success: boolean;
  // @Input() email: EmailForm;

  public email: any = {};

  constructor() {
  }

  ngOnInit() {
    console.log('hello `EmailForm` component');
  }

  sendMail() {
    this.email.from = 'sebisng2@gmail.com'; // TODO remove because 'from' should be generated in backend from user
    console.log(this.email);
    this.sendEmail.emit(this.email);
  }

}
