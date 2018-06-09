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
  MatSnackBarModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContextMenuModule } from 'ngx-contextmenu';
import { ResizableModule } from "angular-resizable-element";

import {
  ClientComponent,
  EmailDialogComponent,
  EmailFolderDialogComponent,
  BoxDialogComponent,
  TaskDialogComponent,
  LinkTaskDialogComponent,
  ContactDetailsDialogComponent,
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
  TaskLegacyService,
  WikiService,
  NetworkService,
  TranslateService,
  AttachmentService,
  WindowRef
} from './shared'; // all services
import { Email, EmailForm } from './shared'; // all models from client
import { SharedModule } from '../shared';
import { ROUTES } from './client.routes';
import { AuthGuard } from '../app.authGuard';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { DndModule } from 'ng2-dnd';
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    //
    FlexLayoutModule,
    InfiniteScrollModule,
    ContextMenuModule,
    ResizableModule,
    DndModule.forRoot(),
    TinymceModule.withConfig({
      selector: 'textarea',
      plugins: ['autoresize'],
      menubar: false,
      statusbar: false,
    })
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
    ContactDetailsDialogComponent,
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
    TaskLegacyService,
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
    ContactDetailsDialogComponent,
    EmailFolderDialogComponent,
    SentenceDialogComponent
  ]
})
export class ClientModule {
}
