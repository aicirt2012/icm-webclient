import { SentenceDialogComponent } from './components/sentenceDialog/sentenceDialog.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ClientComponent, EmailDialogComponent, EmailFolderDialogComponent, TaskDialogComponent, LinkTaskDialogComponent, TasksComponent, ContextComponent, ContextTabComponent, WikiComponent, NetworkComponent, TranslateComponent, EmailDetailedViewComponent, EmailListComponent, HighlightPipe } from './'; // all intelligent components
import { BoxListComponent, BoxListItemComponent, EmailFormComponent, SearchBarComponent, EmailActionBarComponent, EmailViewComponent, TaskListComponent, TaskListItemComponent, TaskItemEmailDialogComponent, EmailResponseComponent, TaskActionBarComponent } from './components'; // all dumb components
import { EmailService, TaskService, WikiService, NetworkService, TranslateService} from './shared'; // all services
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
  exports: [
    TaskItemEmailDialogComponent
  ],
  declarations: [
    ClientComponent,
    //intelligent components
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
    //dumb components
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
