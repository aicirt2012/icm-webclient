import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DatePickerComponent, SpinnerComponent, TopNavbarComponent } from './components'; // all shared components
import { DisableControlDirective } from './directives'; // all shared directives
import { AuthService, HttpService } from './services';
import { SafeHtmlPipe } from './pipes';

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
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    //
    FlexLayoutModule
  ],
  declarations: [
    DatePickerComponent,
    SpinnerComponent,
    TopNavbarComponent,
    DisableControlDirective,
    SafeHtmlPipe
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
