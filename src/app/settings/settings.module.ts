import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Angular2FlexModule } from 'angular2-flex';
import { SettingsComponent } from './';
import { AccountComponent, OverviewComponent, TaskComponent, HelpComponent, GmailComponent, ExchangeComponent, SocioCortexComponent, TrelloComponent } from './components'; // all settings components
import { SharedModule } from '../shared';
import { ROUTES } from './settings.routes';
import { AuthGuard } from '../app.authGuard';
import { SettingsService } from './shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2BootstrapModule,
    Angular2FlexModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    SharedModule
  ],
  declarations: [
    SettingsComponent,
    //dumb components
    AccountComponent,
    TaskComponent,
    HelpComponent,
    OverviewComponent,
    GmailComponent,
    ExchangeComponent,
    TrelloComponent,
    SocioCortexComponent
  ],
  providers: [
      AuthGuard,
      SettingsService
  ],
  exports: [
  ]
})
export class SettingsModule {
 }
