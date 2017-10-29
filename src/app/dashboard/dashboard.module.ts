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
  MatSnackBarModule
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
