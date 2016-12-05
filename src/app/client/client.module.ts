import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Angular2FlexModule } from 'angular2-flex';
import { TagInputModule } from 'ng2-tag-input';

import { ClientComponent, EmailModalComponent, TaskListComponent } from './'; // all intelligent components
import { ListComponent, ListItemComponent, DetailedViewComponent, EmailFormComponent } from './components'; // all dumb components
import { EmailService, TaskService } from './shared'; // all services
import { Email, EmailForm } from './shared'; // all models from client

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Ng2BootstrapModule,
    Angular2FlexModule.forRoot(),
    TagInputModule
  ],
  declarations: [
    ClientComponent,
    //intelligent components
    TaskListComponent,
    EmailModalComponent,
    //dumb components
    ListComponent,
    ListItemComponent,
    DetailedViewComponent,
    EmailFormComponent
  ],
  providers: [
    EmailService,
    TaskService
  ],
  exports: [
      EmailModalComponent
  ]
})
export class ClientModule {
 }
