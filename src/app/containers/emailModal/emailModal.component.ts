import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { EmailService } from '../../services';
import { ModalType } from '../../constants';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'email-modal',
  styleUrls: ['./emailModal.component.css'],
  templateUrl: './emailModal.component.html'
})
export class EmailModalComponent {
  @ViewChild('childModal') public childModal: ModalDirective;
  @Output() closeModal = new EventEmitter<any>();
  @Input() modalType: ModalType;

  constructor(private _emailService: EmailService) {
  }

  ngOnInit() {
    console.log('hello `EmailModalComponent` component');
  }

  ngOnChanges() {
    if(this.modalType === ModalType.create) {
      this.childModal.show();
    }
  }

  public showChildModal(): void {
    if(this.modalType === ModalType.create) {this.childModal.show();}
  }

  public hideChildModal(): void {
    this.childModal.hide();
    this.closeModal.emit();
  }

  sendEmail(mail: any) {
    this._emailService
      .sendMail(mail)
      .subscribe((data: any) => {
        console.log(data);
      },
      error => {
        console.log(error)
      },
      () => { console.log(`Mail to ${mail.to} send!`) });
  }

}
