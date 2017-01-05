import { Component } from '@angular/core';
import { AuthService } from '../shared';
import { Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
})
export class SettingsComponent {
  model: any = {};
  loading = false;
  error = '';
  links = [
    {
      name: 'Email Settings',
      icon: 'email',
      link: '/settings/email'
    },
    {
      name: 'Task Settings',
      icon: 'check_circle',
      link: '/settings/tasks'
    },
    {
      name: 'Overview',
      icon: 'home',
      link: '/settings/overview'
    },
    {
      name: 'Help',
      icon: 'help',
      link: '/settings/help'
    }
  ]

  constructor(
    private router: Router,
    private _auth: AuthService,
    public appState: AppState) { }

  ngOnInit() {
    // reset login status
    console.log('Hello settings Component');
    console.log(this.appState.get());
  }

  login() {
    this.loading = true;
    this._auth.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  getCurrentView(view: string): boolean {
    let currentURL = this.router.url;
    if (currentURL.includes(view))
      return true;
    else
      return false;
  }

}
