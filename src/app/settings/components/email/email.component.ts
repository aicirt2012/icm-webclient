import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MatSnackBar, MatInput } from '@angular/material';


@Component({
  selector: 'email',
  templateUrl: 'email.component.html',
  styleUrls: ['email.component.css'],
  providers: [MatSnackBar]
})
export class EmailComponent {

  public selectedEmail = 'Gmail'

  public gmailConfig = {
    user: '',
    password: '',
    host: '',
    port: 0,
    smtpHost: '',
    smtpPort: 0,
    smtpDomains: []
  }

  public exchangeConfig = {
    user: '',
    password: '',
    host: '',
  }

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data: any) => {
      this.updateData(data);
    });
  }

  updateData(data) {

    this.selectedEmail = data.provider || 'Gmail';

    if (data.emailProvider['gmail']) {
      this.gmailConfig.user = data.emailProvider['gmail'].user;
      this.gmailConfig.password = data.emailProvider['gmail'].password;
      this.gmailConfig.host = data.emailProvider['gmail'].host;
      this.gmailConfig.port = data.emailProvider['gmail'].port;
      this.gmailConfig.smtpHost = data.emailProvider['gmail'].smtpHost;
      this.gmailConfig.smtpPort = data.emailProvider['gmail'].smtpPort;
      this.gmailConfig.smtpDomains = data.emailProvider['gmail'].smtpDomains;
    }

    if (data.emailProvider['exchange']) {
      this.exchangeConfig.user = data.emailProvider['exchange'].user;
      this.exchangeConfig.password = data.emailProvider['exchange'].password;
      this.exchangeConfig.host = data.emailProvider['exchange'].host;
    }

  }

  addDomain(domain: MatInput): void {
    if (domain.value && domain.value.trim() != '') {
      this.gmailConfig['smtpDomains'].push(domain.value.trim());
      domain.value = '';
    }
  }

  deleteDomain(index: number) {
    if (index > -1) {
      this.gmailConfig['smtpDomains'].splice(index, 1);
    }
  }

  updateEmailConfig() {
    if (this.selectedEmail === 'Gmail') {
      this.userService.updateEmailProviderGMail(this.gmailConfig)
        .subscribe((data: any) => {
          this.snackBar.open('Update successful', 'OK');
        }, (error) => {
          this.snackBar.open('Error while updating', 'OK');
        });
    } else if (this.selectedEmail === 'Exchange') {
      this.userService.updateEmailProviderExchange(this.exchangeConfig)
        .subscribe((data: any) => {
          this.snackBar.open('Update successful', 'OK');
        }, (error) => {
          this.snackBar.open('Error while updating', 'OK');
        });
    }
  }
}
