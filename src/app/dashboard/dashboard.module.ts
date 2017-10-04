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
import { DashboardComponent } from './';
import { NetworkComponent, TimelineComponent, StructureComponent} from './components';
import { SharedModule } from '../shared';
import { ROUTES } from './dashboard.routes';
import { AuthGuard } from '../app.authGuard';
import { DashboardService } from './shared';

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
    DashboardComponent,
    NetworkComponent,
    TimelineComponent,
    StructureComponent
  ],
  providers: [
    AuthGuard,
    DashboardService
  ],
  exports: [
  ]
})
export class DashboardModule {
 }
