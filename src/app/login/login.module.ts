import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Angular2FlexModule } from 'angular2-flex';

import { AuthService } from '../shared'; // all services
import { LoginComponent } from './';


@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, Ng2BootstrapModule, Angular2FlexModule],
  declarations: [ LoginComponent ],
  providers: []
})

export class LoginModule { }
