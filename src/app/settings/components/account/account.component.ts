import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MatSnackBar, MatInput } from '@angular/material';


@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
  providers: [MatSnackBar]
})
export class AccountComponent {

public emailConfig = {
  name:'Gmail',
  user: 'sebisng2@gmail.com',
  password: 's3b1sng2',
  host: 'imap.gmail.com',
  port: 993,
  smtpHost: 'smtp.gmail.com',
  smtpPort: 465,
  smtpDomains: ['gmail.com', 'googlemail.com']
};

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data: any) => {
      if(data.provider.name) {
        this.emailConfig = data.provider;
      }
    })
  }

  addDomain(domain: MatInput): void {
    if (domain.value && domain.value.trim() != '') {
      this.emailConfig['smtpDomains'].push(domain.value.trim());
      domain.value = '';
    }
  }

  deleteDomain(index: number) {
    if(index > -1) {
      this.emailConfig['smtpDomains'].splice(index,1);
    }
  }

  updateEmailConfig() {
    this.userService.updateEmailConfig(this.emailConfig)
    .subscribe((data: any) => {
      this.emailConfig = data.provider;
      this.snackBar.open('Update successful', 'OK');
    }, (error) => {
      this.snackBar.open('Error while updating', 'OK');
    });
  }
}
