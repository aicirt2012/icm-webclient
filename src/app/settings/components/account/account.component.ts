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

  // TODO: default configuration
  public emailConfig = {
    name: '',
    user: '',
    password: '',
    host: '',
    port: 0,
    smtpHost: '',
    smtpPort: 0,
    smtpDomains: []
  };

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data: any) => {
      this.updateData(data);
    })
  }

  updateData(data) {
      let emailProviderName = data.provider || 'Gmail';
      this.emailConfig.name = emailProviderName;
      emailProviderName = emailProviderName.toLowerCase();
      this.emailConfig.user = data.emailProvider[emailProviderName].user;
      this.emailConfig.password = data.emailProvider[emailProviderName].password;
      this.emailConfig.host = data.emailProvider[emailProviderName].host;
      this.emailConfig.port = data.emailProvider[emailProviderName].port;
      this.emailConfig.smtpHost = data.emailProvider[emailProviderName].smtpHost;
      this.emailConfig.smtpPort = data.emailProvider[emailProviderName].smtpPort;
      this.emailConfig.smtpDomains = data.emailProvider[emailProviderName].smtpDomains;
  }

  addDomain(domain: MatInput): void {
    if (domain.value && domain.value.trim() != '') {
      this.emailConfig['smtpDomains'].push(domain.value.trim());
      domain.value = '';
    }
  }

  deleteDomain(index: number) {
    if (index > -1) {
      this.emailConfig['smtpDomains'].splice(index, 1);
    }
  }

  updateEmailConfig() {
    this.userService.updateEmailConfig(this.emailConfig)
      .subscribe((data: any) => {
        this.updateData(data);
        this.snackBar.open('Update successful', 'OK');
      }, (error) => {
        this.snackBar.open('Error while updating', 'OK');
      });
  }
}
