import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SpinnerComponent, TopNavbarComponent } from './components'; // all shared components
import { AuthService, HttpService } from './services';

@NgModule({
  imports: [RouterModule, BrowserModule, FormsModule, MaterialModule.forRoot(), FlexLayoutModule.forRoot()],
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
