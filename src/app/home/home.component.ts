import { Component, ViewChild } from '@angular/core';
import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import { NavBarComponent } from './navbar';
import { Email } from '../models/email.model';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'home',  // <home></home>
  providers: [
    Title
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  localState = { value: '' };

  constructor(private emailService: EmailService, public appState: AppState, public title: Title) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
