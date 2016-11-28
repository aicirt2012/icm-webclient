import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { EmailService } from '../../../../services';
import { ModalType } from '../../../../constants';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'email-modal',
  styleUrls: ['./emailModal.component.css'],
  templateUrl: './emailModal.component.html'
})
export class EmailModalComponent {
  @ViewChild('emailModal') public emailModal: ModalDirective;
  @Output() closeModal = new EventEmitter<any>();
  @Input() modalType: ModalType;

  public currentlySending: boolean = false;

  constructor(private _emailService: EmailService) {
  }

  ngOnInit() {
    console.log('hello `EmailModalComponent` component');
  }

  ngOnChanges() {
    if (this.modalType === ModalType.create) {
      this.emailModal.show();
    }
  }

  public hideChildModal(): void {
    this.emailModal.hide();
    this.closeModal.emit();
  }

  sendEmail(mail: any) {
    this.currentlySending = true;
    this._emailService
      .sendMail(mail)
      .subscribe((data: any) => {
        this.currentlySending = false;
        this.hideChildModal();
      },
      error => {
        console.log(error)
      },
      () => {
        alert(`Mail to ${mail.to} send!`);
      });
  }

}
