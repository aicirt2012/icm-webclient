import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ng2-tag-input';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ClientComponent, EmailModalComponent, TasksComponent,TaskModalComponent } from './'; // all intelligent components
import { NavBarComponent,NavBarListItemComponent, ListComponent, DetailedViewComponent, EmailFormComponent, SearchBarComponent, EmailActionBarComponent, EmailViewComponent, TaskListComponent } from './components'; // all dumb components
import { EmailService, TaskService } from './shared'; // all services
import { Email, EmailForm } from './shared'; // all models from client
import { SharedModule } from '../shared';
import { ROUTES } from './client.routes';
import { AuthGuard } from '../app.authGuard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    TagInputModule,
    SharedModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
  ],
  declarations: [
    ClientComponent,
    //intelligent components
    TasksComponent,
    EmailModalComponent,
    //dumb components
    ListComponent,
    DetailedViewComponent,
    EmailFormComponent,
    SearchBarComponent,
    EmailActionBarComponent,
    EmailViewComponent,
    TaskListComponent,
    TaskModalComponent,
    NavBarComponent,
    NavBarListItemComponent
  ],
  providers: [
    EmailService,
    TaskService,
    AuthGuard
  ],
  exports: [
      EmailModalComponent,
      TaskModalComponent
  ]
})
export class ClientModule {
}
