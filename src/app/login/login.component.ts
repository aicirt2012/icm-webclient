import { Component } from '@angular/core';
import { AuthService } from '../shared';
import { Router } from '@angular/router';
import C from '../shared/constants';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  model: any = {};
  loading = false;
  error = '';
  googleLoginLink = `${C.server}auth/google`;

  constructor(
    private router: Router,
    private _auth: AuthService) { }

  ngOnInit() {
    // reset login status
    this._auth.logout();
  }

  login() {
    //this.loading = true;
    this._auth.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/box/0']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          //this.loading = false;
        }
      });
  }
}
