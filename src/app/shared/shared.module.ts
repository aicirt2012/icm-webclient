import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent, TopNavbarComponent } from './components'; // all shared components
import { AuthService, HttpService } from './services';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, BrowserModule, FormsModule],
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
