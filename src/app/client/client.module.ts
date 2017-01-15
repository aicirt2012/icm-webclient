import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ClientComponent, EmailDialogComponent, TaskDialogComponent, TasksComponent, DetailedViewComponent} from './'; // all intelligent components
import { NavBarComponent,NavBarListItemComponent, ListComponent, EmailFormComponent, SearchBarComponent, EmailActionBarComponent, EmailViewComponent, TaskListComponent,TaskListItemComponent, EmailResponseComponent } from './components'; // all dumb components
import { EmailService, TaskService } from './shared'; // all services
import { Email, EmailForm } from './shared'; // all models from client
import { SharedModule } from '../shared';
import { ROUTES } from './client.routes';
import { AuthGuard } from '../app.authGuard';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    InfiniteScrollModule
  ],
  declarations: [
    ClientComponent,
    //intelligent components
    TasksComponent,
    EmailDialogComponent,
    //dumb components
    TaskDialogComponent,
    ListComponent,
    DetailedViewComponent,
    EmailResponseComponent,
    EmailFormComponent,
    SearchBarComponent,
    EmailActionBarComponent,
    EmailViewComponent,
    TaskListComponent,
    TaskListItemComponent,
    NavBarComponent,
    NavBarListItemComponent
  ],
  providers: [
    EmailService,
    TaskService,
    AuthGuard
  ],
  entryComponents: [
    EmailDialogComponent,
    TaskDialogComponent
  ]
})
export class ClientModule {
}
