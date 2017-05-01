import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ClientComponent, EmailDialogComponent, EmailFolderDialogComponent, TaskDialogComponent, LinkTaskDialogComponent, TasksComponent, ContextComponent, ContextTabComponent, WikiComponent, NetworkComponent, TranslateComponent, EmailDetailedViewComponent, EmailListComponent, HighlightPipe, TaskListComponent, SearchBarComponent, EmailViewComponent, BoxListComponent, BoxListItemComponent, EmailActionBarComponent, EmailResponseComponent, TaskActionBarComponent, TaskListItemComponent, EmailFormComponent, TaskItemEmailDialogComponent, SentenceDialogComponent} from './'; 
import { EmailService, TaskService, WikiService, NetworkService, TranslateService} from './shared'; // all services
import { Email, EmailForm } from './shared'; // all models from client
import { SharedModule } from '../shared';
import { ROUTES } from './client.routes';
import { AuthGuard } from '../app.authGuard';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ContextMenuModule } from 'ngx-contextmenu/lib';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    InfiniteScrollModule,
    ContextMenuModule
  ],
  exports: [
    TaskItemEmailDialogComponent
  ],
  declarations: [
    ClientComponent,
    TasksComponent,
    ContextComponent,
    ContextTabComponent,
    WikiComponent,
    NetworkComponent,
    TranslateComponent,
    EmailDialogComponent,
    EmailFolderDialogComponent,
    EmailDetailedViewComponent,
    EmailListComponent,
    HighlightPipe,
    TaskDialogComponent,
    LinkTaskDialogComponent,
    EmailResponseComponent,
    EmailFormComponent,
    SearchBarComponent,
    EmailActionBarComponent,
    EmailViewComponent,
    TaskListComponent,
    TaskListItemComponent,
    TaskItemEmailDialogComponent,
    BoxListComponent,
    SentenceDialogComponent,
    BoxListItemComponent,
    TaskActionBarComponent
  ],
  providers: [
    EmailService,
    TaskService,
    WikiService,
    NetworkService,
    TranslateService,
    AuthGuard
  ],
  entryComponents: [
    EmailDialogComponent,
    TaskDialogComponent,
    LinkTaskDialogComponent,
    EmailFolderDialogComponent,
    SentenceDialogComponent
  ]
})
export class ClientModule {
}
