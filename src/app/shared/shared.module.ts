import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Angular2FlexModule } from 'angular2-flex';
import { SpinnerComponent, TopNavbarComponent } from './components'; // all shared components
import { AuthService, HttpService } from './services';


@NgModule({
  imports: [RouterModule, BrowserModule, FormsModule, Ng2BootstrapModule, Angular2FlexModule],
  declarations: [
    SpinnerComponent,
    TopNavbarComponent],
  exports: [
    SpinnerComponent,
    TopNavbarComponent
  ],
  providers: [
    AuthService,
    HttpService
  ]
})
export class SharedModule { }
