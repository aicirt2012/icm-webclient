import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatChipsModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatRadioModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SettingsComponent } from './';
import { EmailComponent, OverviewComponent, TaskComponent, HelpComponent, SocioCortexComponent, TrelloComponent, PatternsComponent, ContactComponent } from './components'; // all settings components
import { SharedModule } from '../shared';
import { ROUTES } from './settings.routes';
import { AuthGuard } from '../app.authGuard';
import { UserService } from './shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // angular material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatRadioModule,
    //
    FlexLayoutModule,
    RouterModule.forRoot(ROUTES),
    SharedModule
  ],
  declarations: [
    SettingsComponent,
    //dumb components
    EmailComponent,
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
