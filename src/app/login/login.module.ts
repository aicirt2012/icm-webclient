import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
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
import {FlexLayoutModule} from "@angular/flex-layout";
import {AuthService} from '../shared'; // all services
import {LoginComponent} from './';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    FlexLayoutModule
  ],
  providers: [],
})

export class LoginModule {
}
