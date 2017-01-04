import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AppState } from './app.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
  <router-outlet></router-outlet>
  <snackbar></snackbar>
  `
})
export class AppComponent {
  public syncing: boolean = false;
  public name: string = 'Email Client';
  private viewContainerRef: ViewContainerRef;

  constructor(
    public appState: AppState, viewContainerRef: ViewContainerRef, private _cookieService: CookieService) {
    this.viewContainerRef = viewContainerRef;
    if (_cookieService.get('email-oauth')) {
      localStorage.setItem('email-jwt', _cookieService.get('email-oauth'));
      _cookieService.remove('email-oauth');
    }
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
