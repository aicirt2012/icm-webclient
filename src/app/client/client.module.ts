import {NgModule, ModuleWithProviders} from '@angular/core';
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
import {ContextMenuModule} from 'ngx-contextmenu';

import {
  ClientComponent,
  EmailDialogComponent,
  EmailFolderDialogComponent,
  BoxDialogComponent,
  TaskDialogComponent,
  LinkTaskDialogComponent,
  TasksComponent,
  ContextComponent,
  ContextTabComponent,
  WikiComponent,
  NetworkComponent,
  TranslateComponent,
  EmailDetailedViewComponent,
  EmailListComponent,
  HighlightPipe,
  TaskListComponent,
  SearchBarComponent,
  EmailViewComponent,
  BoxListComponent,
  BoxListItemComponent,
  EmailActionBarComponent,
  EmailResponseComponent,
  TaskActionBarComponent,
  TaskListItemComponent,
  EmailFormComponent,
  TaskItemEmailDialogComponent,
  SentenceDialogComponent
} from './';
import {
  EmailService,
  BoxService,
  TaskService,
  WikiService,
  NetworkService,
  TranslateService,
  AttachmentService,
  WindowRef
} from './shared'; // all services
import {Email, EmailForm} from './shared'; // all models from client
import {SharedModule} from '../shared';
import {ROUTES} from './client.routes';
import {AuthGuard} from '../app.authGuard';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {DndModule} from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
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
    InfiniteScrollModule,
    ContextMenuModule,
    DndModule.forRoot()
  ],
  exports: [
    TaskItemEmailDialogComponent,
    DndModule
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
    BoxDialogComponent,
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
    BoxService,
    AttachmentService,
    TaskService,
    WikiService,
    NetworkService,
    TranslateService,
    AuthGuard,
    WindowRef,
  ],
  entryComponents: [
    EmailDialogComponent,
    BoxDialogComponent,
    TaskDialogComponent,
    LinkTaskDialogComponent,
    EmailFolderDialogComponent,
    SentenceDialogComponent
  ]
})
export class ClientModule {
}
