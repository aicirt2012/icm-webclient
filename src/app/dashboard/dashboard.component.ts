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
      name: 'Timeline',
      icon: 'timeline',
      link: '/dashboard/timeline'
    },
    {
      name: 'Person Network',
      icon: 'share',
      link: '/dashboard/network'
    },
    {
      name: 'Structural Information',
      icon: 'fingerprint',
      link: '/dashboard/structure'
    }
  ]

  constructor(
    private router: Router,
    private _auth: AuthService,
    public appState: AppState) { }

  ngOnInit() {
    console.log(this.appState.get());
  }

  getCurrentView(view: string): boolean {
    let currentURL = this.router.url;
    if (currentURL.includes(view))
      return true;
    else
      return false;
  }

}
