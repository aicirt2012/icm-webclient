import { TaskCardComponent } from './components';
import { ClientModule } from './../client/client.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
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
import { AuthService } from '../shared'; // all services
import { TaskOverviewComponent } from './';
import { ROUTES } from './taskOverview.routes';
import { SortingPipe } from './filter.pipe';

@NgModule({
  declarations: [TaskOverviewComponent, TaskCardComponent, SortingPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    SharedModule,
    ClientModule
  ],
  providers: [],
})

export class TaskOverviewModule { }
