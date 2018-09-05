import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { TaskService } from '../../../shared';
import { FormController } from './form.controller';
import { AutocompleteController } from './autocomplete.controller';
import { Location } from '@angular/common';

@Component({
  selector: 'task-dialog',
  styleUrls: ['./taskDialog.component.css'],
  templateUrl: './taskDialog.component.html'
})
export class TaskDialogComponent {

  private isEditMode: boolean;
  private task: any;
  private submitted: boolean = false;
  private autocomplete: any;    // used only in template for data access

  private formController: FormController;
  private autocompleteController: AutocompleteController;

  // loading: any = {
  //   trello: false,
  //   sociocortex: false
  // };

  constructor(public taskDialogRef: MatDialogRef<TaskDialogComponent>,
              private snackBar: MatSnackBar,
              private taskService: TaskService,
              formBuilder: FormBuilder,
              location: Location) {
    this.formController = new FormController(formBuilder, location);
    this.autocompleteController = new AutocompleteController();
  }

  onPostConstruct(task: any, email: any, user: any, isEditMode: boolean) {
    this.isEditMode = isEditMode;
    this.task = task;
    this.formController.onPostConstruct(task, email, user, isEditMode);
    this.autocompleteController.onPostConstruct(task, email.suggestedData, isEditMode);
  }

  ngOnInit() {
    this.autocomplete = this.autocompleteController.get();
    this.autocompleteController.initAutocompleteData();
    this.formController.valueChanges('title').subscribe(
      title => this.autocompleteController.filterTitles(title));
    if (this.isEditMode) {
      this.formController.setValue('intent.intendedAction', 'CREATE');  // TODO replace dummy value by custom validator that respects the edit mode
      if (this.isSociocortexProvider())
        this.initSociocortexTask();
      else if (this.isTrelloProvider())
        this.initTrelloTask();
    }
  }

  private initSociocortexTask() {
    this.taskService.getSociocortexWorkspaces().take(1)
      .subscribe(workspaces => this.autocompleteController.updateSociocortexWorkspaces(workspaces));
    this.taskService.getSociocortexCase(TaskService.getParameter(this.task, 'case')).take(1)
      .subscribe(scCase => {
        this.autocompleteController.updateSociocortexCases([scCase]);
        this.formController.setValue('context.sociocortexWorkspace', scCase.workspace);
      });
    this.taskService.getSociocortexMembers(this.task.providerId).take(1)
      .subscribe(members => this.autocompleteController.updateSociocortexOwner(members));
  }

  private initTrelloTask() {
    this.taskService.getTrelloMembers(TaskService.getParameter(this.task, 'idBoard')).take(1)
      .subscribe(members => this.autocompleteController.updateTrelloAssignees(members));
  }

  onProviderSelect(provider: string) {
    this.formController.reset(["intent.intendedAction", "metadata", "context", "trelloContent", "sociocortexContent"]);
    if (provider === 'TRELLO') {
      this.taskService.getTrelloBoards()
        .take(1)
        .subscribe(boards => this.autocompleteController.updateTrelloBoards(boards))
    } else if (provider === 'SOCIOCORTEX') {
      this.taskService.getSociocortexWorkspaces()
        .take(1)
        .subscribe(workspaces => {
          this.autocompleteController.updateSociocortexWorkspaces(workspaces);
          if (workspaces.length == 1)
            this.formController.setValue('context.sociocortexWorkspace', workspaces[0].id);
        })
    }
  }

  onActionSelect() {
    this.formController.reset(["metadata", "context", "trelloContent", "sociocortexContent"]);
  }

  onBoardSelect(boardId: string) {
    this.formController.reset(["metadata", "trelloContent", "context.trelloTask", "context.trelloList"]);
    this.taskService.getTrelloMembers(boardId).take(1)
      .subscribe(members => this.autocompleteController.updateTrelloAssignees(members));
    this.autocompleteController.filterTrelloLists(boardId);
  }

  onListSelect(listId: string) {
    this.formController.reset(["metadata", "trelloContent", "context.trelloTask"]);
    if (listId && this.formController.hasValue('intent.intendedAction', 'LINK')) {
      this.taskService.getTrelloTasks(listId).take(1)
        .subscribe(tasks => this.autocompleteController.updateTrelloTasks(tasks));
    }
  }

  onTaskSelect(taskId: string) {
    this.formController.reset(["metadata"]);
    if (this.isTrelloProvider()) {
      this.formController.reset(["trelloContent"]);
      this.taskService.getTrelloTask(taskId).take(1)
        .subscribe(task => this.formController.setTask(task));
    } else if (this.isSociocortexProvider()) {
      this.formController.reset(["sociocortexContent"]);
      this.taskService.getSociocortexMembers(taskId).take(1)
        .subscribe(members => this.autocompleteController.updateSociocortexOwner(members));
      this.taskService.getSociocortexTask(taskId).take(1)
        .subscribe(task => this.formController.setTask(task));
    }
  }

  onWorkspaceSelect(workspaceId: string) {
    this.formController.reset(["metadata", "sociocortexContent", "context.sociocortexCase", "context.sociocortexTask"]);
    this.taskService.getSociocortexCases(workspaceId).take(1)
      .subscribe(cases => this.autocompleteController.updateSociocortexCases(cases));
  }

  onCaseSelect(caseId: string) {
    this.formController.reset(["metadata", "sociocortexContent"]);
    this.taskService.getSociocortexTasks(caseId).take(1)
      .subscribe(tasks => this.autocompleteController
        .updateSociocortexTasks(tasks, this.formController.hasValue('intent.intendedAction', 'CREATE')));
  }

  onUnlink() {
    this.submitted = true;
    this.taskService.unlinkTask(this.formController.getTask()).subscribe(
      () => this.onSubmissionSuccess('Task successfully unlinked.'),
      error => this.onSubmissionFailure('Error while unlinking task.', error))
  }

  onSubmit(complete: boolean, terminate: boolean) {
    if (this.formController.isValid()) {
      this.submitted = true;
      const convertedTask = this.formController.getTask();
      console.log("Form submit.", this.formController.get(), convertedTask);
      if (this.isEditMode)
        this.onEditSubmit(convertedTask, complete, terminate);
      else if (this.formController.hasValue('intent.intendedAction', 'LINK'))
        this.onLinkSubmit(convertedTask);
      else
        this.onCreateSubmit(convertedTask);
    } else {
      console.log("Form has errors, submit prevented.");
      this.formController.showValidationErrors();
    }
  }

  private onEditSubmit(convertedTask, complete: boolean, terminate: boolean) {
    this.taskService.updateTask(convertedTask).subscribe(() => {
      if (complete)
        this.onCompleteSubmit(convertedTask._id);
      else if (terminate)
        this.onTerminateSubmit(convertedTask._id);
      else
        this.onSubmissionSuccess('Task successfully updated.');
    }, error => this.onSubmissionFailure('Error while updating task.', error));
  }

  private onCompleteSubmit(taskId) {
    if (this.isSociocortexProvider())
      this.taskService.completeSociocortexTask(taskId).subscribe(
        () => this.onSubmissionSuccess('Task successfully completed.'),
        error => this.onSubmissionFailure('Error while completing task.', error));
    else if (this.isTrelloProvider())
      this.taskService.archiveTrelloTask(taskId).subscribe(
        () => this.onSubmissionSuccess('Task successfully archived.'),
        error => this.onSubmissionFailure('Error while archiving task.', error));
  }

  private onTerminateSubmit(taskId) {
    if (this.isSociocortexProvider())
      this.taskService.terminateSociocortexTask(taskId).subscribe(
        () => this.onSubmissionSuccess('Task successfully terminated.'),
        error => this.onSubmissionFailure('Error while terminating task.', error));
    else if (this.isTrelloProvider())
      this.taskService.deleteTask(taskId).subscribe(
        () => this.onSubmissionSuccess('Task successfully deleted.'),
        error => this.onSubmissionFailure('Error while deleting task.', error));
  }

  private onLinkSubmit(convertedTask) {
    this.taskService.linkTask(convertedTask).subscribe(
      () => this.onSubmissionSuccess('Task successfully linked.'),
      error => this.onSubmissionFailure('Error while linking task.', error));
  }

  private onCreateSubmit(convertedTask) {
    this.taskService.createTask(convertedTask).subscribe(
      () => this.onSubmissionSuccess('Task successfully created.'),
      error => this.onSubmissionFailure('Error while creating task.', error));
  }

  private isTrelloProvider(): boolean {
    return this.formController.hasValue('intent.provider', 'TRELLO');
  }

  private isSociocortexProvider(): boolean {
    return this.formController.hasValue('intent.provider', 'SOCIOCORTEX');
  }

  private onSubmissionSuccess(message: string): void {
    this.closeDialog();
    this.snackBar.open(message, 'OK');
  }

  private onSubmissionFailure(message: string, error: Error): void {
    console.log(error);
    this.submitted = false;
    this.snackBar.open(message, 'OK');
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
