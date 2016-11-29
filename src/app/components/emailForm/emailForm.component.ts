import { Component, Input, EventEmitter, Output } from '@angular/core';
import { EmailForm } from '../../models';

@Component({
  selector: 'email-form',
  styleUrls: ['./emailForm.component.css'],
  templateUrl: './emailForm.component.html'
})
export class EmailFormComponent {
  @Output() sendEmail = new EventEmitter<any>();
  @Input() emailForm: EmailForm;

  constructor() {
  }

  ngOnInit() {
    console.log(`hello EmailForm component`);
  }

  sendMail() {
    this.sendEmail.emit(this.emailForm);
  }

}
