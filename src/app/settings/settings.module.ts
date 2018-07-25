import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SettingsComponent } from './';
import {
  ContactComponent,
  EmailComponent,
  HelpComponent,
  OverviewComponent,
  PatternsComponent,
  SocioCortexComponent,
  TaskComponent,
  TrelloComponent
} from './components'; // all settings components
// all settings components
import { SharedModule } from '../shared';
import { ROUTES } from './settings.routes';
import { AuthGuard } from '../app.authGuard';
import { UserService, TaskService } from './shared';

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
    UserService,
    TaskService
  ],
  exports: []
})
export class SettingsModule {
}
