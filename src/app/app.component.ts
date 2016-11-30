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
<!--
 <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Index
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./home'] ">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./detail'] ">
          Detail
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./about'] ">
          About
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      <div>
        <a [href]="url">
          <img [src]="angularclassLogo" width="25%">
        </a>
      </div>
    </footer>-->
  `
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Email Client';
  url = '';
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
