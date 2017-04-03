import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MdInput } from '@angular/material';

@Component({
  selector: 'email-response',
  styleUrls: ['./emailResponse.component.css'],
  templateUrl: './emailResponse.component.html'
})
export class EmailResponseComponent {

  @Input() emailForm: any;
  @Input() sending: boolean;
  @Output() sendMail = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    if(this.emailForm.to) {
      let to = this.emailForm.to;
      this.emailForm.to = [];
      this.emailForm.to.push(to);
    } else {
      this.emailForm.to = [];
    }
    this.emailForm.cc = [];
    this.emailForm.bcc = [];
  }

  addAddress(address: MdInput, addressType: string): void {
    if (address.value && address.value.trim() != '') {
      this.emailForm[addressType].push({
        address: address.value.trim()
      });
      address.value = '';
    }
  }

  deleteAddress(index: number, addressType: string) {
    if(index > -1) {
      this.emailForm[addressType].splice(index,1);
    }
  }

  sendEmail() {
    this.sendMail.emit(this.emailForm);
  }

}
