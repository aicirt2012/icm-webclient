import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'email-form',
  styleUrls: ['./emailForm.component.css'],
  templateUrl: './emailForm.component.html'
})
export class EmailFormComponent {
  @Output() sendEmail = new EventEmitter<any>();
  @Input() emailForm: any;

  public tagInputOptions = {
          placeholder: "+ email address",
          secondaryPlaceholder: "Enter email address"
      }

  constructor() {
  }

  ngOnInit() {
    console.log(`hello EmailForm component`);
  }

  sendMail() {
    this.sendEmail.emit(this.emailForm);
  }

}
