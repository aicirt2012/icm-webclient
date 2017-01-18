import { Component } from '@angular/core';
import { AuthService } from '../shared';
import { Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  model: any = {};
  loading = false;
  error = '';
  links = [
    {
      name: 'Network',
      icon: 'email',
      link: '/dashboard/network'
    },
    {
      name: 'Timeline',
      icon: 'home',
      link: '/dashboard/timeline'
    }
  ]

  constructor(
    private router: Router,
    private _auth: AuthService,
    public appState: AppState) { }

  ngOnInit() {
    // reset login status
    console.log('Hello dashboard Component');
    console.log(this.appState.get());
  }

  getCurrentView(view: string): boolean {
    console.log('here Im');
    let currentURL = this.router.url;
    if (currentURL.includes(view))
      return true;
    else
      return false;
  }

}
