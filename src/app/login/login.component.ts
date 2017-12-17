import { DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AuthService } from '../shared';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import C from '../shared/constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  model: any = {};
  loading = false;
  error = '';
  googleLoginLink = `${C.server}/auth/google`;

  constructor(private router: Router, private _auth: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/img/google.svg'));
    iconRegistry.addSvgIcon('exchange', sanitizer.bypassSecurityTrustResourceUrl('assets/img/exchange.svg'));
  }

  ngOnInit() {
    /** reset login status */
    this._auth.logout();
  }

  public login() {
    this._auth.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/box', {outlets: {boxId: ['NONE']}}]);
        } else {
          this.error = 'Username or password is incorrect!';
        }
      });
  }

  public signUp() {
    this._auth.signUp(this.model.username, this.model.password)
      .subscribe(result => {
        if (result.status == 200) {
          this.login();
        } else {
          this.error = 'Username already exist!';
        }
      });
  }
}
