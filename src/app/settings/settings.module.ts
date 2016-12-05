import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Angular2FlexModule } from 'angular2-flex';

import { SettingsComponent } from './';
import { AccountComponent, OverviewComponent, TasksComponent, HelpComponent, GmailComponent, ExchangeComponent, SocioCortexComponent, TrelloComponent } from './components'; // all settings components

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2BootstrapModule,
    Angular2FlexModule.forRoot()
  ],
  declarations: [
    SettingsComponent,
    //dumb components
    AccountComponent,
    TasksComponent,
    HelpComponent,
    OverviewComponent,
    GmailComponent,
    ExchangeComponent,
    TrelloComponent,
    SocioCortexComponent
  ],
  providers: [

  ],
  exports: [
  ]
})
export class SettingsModule {
 }
