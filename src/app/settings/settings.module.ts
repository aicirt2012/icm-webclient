import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SettingsComponent } from './';
import { AccountComponent, OverviewComponent, TaskComponent, HelpComponent, SocioCortexComponent, TrelloComponent, EmailConfigComponent } from './components'; // all settings components
import { SharedModule } from '../shared';
import { ROUTES } from './settings.routes';
import { AuthGuard } from '../app.authGuard';
import { SettingsService } from './shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
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
    TrelloComponent,
    SocioCortexComponent,
    EmailConfigComponent
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
