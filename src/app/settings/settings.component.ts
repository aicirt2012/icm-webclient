import { Component } from '@angular/core';
import { AuthService } from '../shared';
import { Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss'],
})
export class SettingsComponent {
  model: any = {};
  loading = false;
  error = '';
  links = [
    {
      name: 'Overview',
      icon: 'home',
      link: '/settings/overview'
    },
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
      name: 'Patterns',
      icon: 'data_usage',
      link: '/settings/patterns'
    },
/*  {
      name: 'Help',
      icon: 'help',
      link: '/settings/help'
    }*/
  ]

  constructor(
    private router: Router,
    private _auth: AuthService,
    public appState: AppState) { }

  getCurrentView(view: string): boolean {
    let currentURL = this.router.url;
    if (currentURL.includes(view))
      return true;
    else
      return false;
  }

}
