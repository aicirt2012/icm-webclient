import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DatePickerComponent, SpinnerComponent, TopNavbarComponent } from './components'; // all shared components
import { DisableControlDirective } from './directives'; // all shared directives
import { AuthService, HttpService } from './services';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
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
    //
    FlexLayoutModule
  ],
  declarations: [
    DatePickerComponent,
    SpinnerComponent,
    TopNavbarComponent,
    DisableControlDirective
  ],
  exports: [
    DatePickerComponent,
    SpinnerComponent,
    TopNavbarComponent,
    DisableControlDirective
  ],
  providers: [
    AuthService,
    HttpService
  ]
})
export class SharedModule {
}
