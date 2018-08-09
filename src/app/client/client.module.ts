import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatChipsModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContextMenuModule } from 'ngx-contextmenu';
import { ResizableModule } from "angular-resizable-element";

import {
  ClientComponent,
  EmailDialogComponent,
  EmailFolderDialogComponent,
  BoxDialogComponent,
  ContactDetailsDialogComponent,
  TasksComponent,
  TaskItemComponent,
  NewTaskDialogComponent,
  EditTaskDialogComponent,
  TaskContentTrelloComponent,
  TaskContentSociocortexComponent,
  ContextComponent,
  ContextTabComponent,
  WikiComponent,
  NetworkComponent,
  TranslateComponent,
  EmailDetailedViewComponent,
  EmailListComponent,
  HighlightPipe,
  SearchBarComponent,
  EmailViewComponent,
  BoxListComponent,
  BoxListItemComponent,
  EmailActionBarComponent,
  EmailResponseComponent,
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
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
    // angular material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
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
    TaskItemComponent,
    NewTaskDialogComponent,
    EditTaskDialogComponent,
    TaskContentTrelloComponent,
    TaskContentSociocortexComponent,
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
    ContactDetailsDialogComponent,
    EmailResponseComponent,
    EmailFormComponent,
    SearchBarComponent,
    EmailActionBarComponent,
    EmailViewComponent,
    TaskItemEmailDialogComponent,
    BoxListComponent,
    SentenceDialogComponent,
    BoxListItemComponent,
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
    NewTaskDialogComponent,
    EditTaskDialogComponent,
    ContactDetailsDialogComponent,
    EmailFolderDialogComponent,
    SentenceDialogComponent
  ]
})
export class ClientModule {
}
