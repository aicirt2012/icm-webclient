import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdToolbarModule,
  MdTooltipModule,
  MdSelectModule,
  MdCardModule,
  MdChipsModule,
  MdTabsModule,
  MdFormFieldModule,
  MdSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SettingsComponent } from './';
import { AccountComponent, OverviewComponent, TaskComponent, HelpComponent, SocioCortexComponent, TrelloComponent, PatternsComponent, ContactComponent } from './components'; // all settings components
import { SharedModule } from '../shared';
import { ROUTES } from './settings.routes';
import { AuthGuard } from '../app.authGuard';
import { UserService } from './shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // angular material
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdToolbarModule,
    MdTooltipModule,
    MdSelectModule,
    MdCardModule,
    MdChipsModule,
    MdTabsModule,
    MdFormFieldModule,
    MdSnackBarModule,
    //
    FlexLayoutModule,
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
    PatternsComponent,
    ContactComponent
  ],
  providers: [
      AuthGuard,
      UserService
  ],
  exports: [
  ]
})
export class SettingsModule {
 }
