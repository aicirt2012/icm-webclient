import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    'app.component.scss'
  ],
  template: `
     <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(
    public appState: AppState, private _cookieService: CookieService) {
    if (_cookieService.get('email-oauth')) {
      localStorage.setItem('email-jwt', _cookieService.get('email-oauth'));
      _cookieService.remove('email-oauth');
    }
  }
}

