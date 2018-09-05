import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
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

  public isEditMode: boolean;

  loading: any = {
    trello: false,
    sociocortex: false
  };
  submitted: boolean = false;

  private formController: FormController;
  private autocompleteController: AutocompleteController;

  private form: FormGroup;
  private autocomplete: any;

  constructor(public taskDialogRef: MatDialogRef<TaskDialogComponent>,
              private snackBar: MatSnackBar,
              private taskService: TaskService,
              formBuilder: FormBuilder,
              location: Location) {
    this.formController = new FormController(formBuilder, location);
    this.autocompleteController = new AutocompleteController(this.taskService);
  }

  onPostConstruct(task: any, email: any, user: any, isEditMode: boolean) {
    this.isEditMode = isEditMode;
    this.formController.onPostConstruct(task, email, user, isEditMode);
    this.autocompleteController.onPostConstruct(task, email.suggestedData, isEditMode);
  }

  ngOnInit() {
    this.form = this.formController.get();
    this.autocomplete = this.autocompleteController.get();
    this.autocompleteController.initAutocompleteData(this.form);
    this.initInputCallbacks();
  }

  private initInputCallbacks() {
    this.form.get('metadata.dueDateUnformatted').valueChanges
      .subscribe(date => {
        this.form.get('metadata.dueDate').setValue(new Date(date));
      });
    this.form.get('title').valueChanges
      .subscribe(updatedValue => {
        this.autocomplete.titles.filtered = this.autocomplete.titles.all.filter(title => title.indexOf(updatedValue) == 0)
      });
    this.form.get('metadata.dueDate').valueChanges
      .subscribe(updatedValue => {
        this.autocomplete.dates.filtered = this.autocomplete.dates.all.filter(date => date.indexOf(updatedValue) == 0)
      });
  }

  onProviderSelect(provider: string) {
    this.formController.reset(["intent.intendedAction", "metadata", "context", "trelloContent", "sociocortexContent"]);
    if (provider === 'TRELLO') {
      this.taskService.getTrelloBoards()
        .take(1)
        .subscribe(boards => {
          // keep reference to all boards
          this.autocomplete.trelloBoards = boards;
          // extract and keep nested lists
          let lists = [];
          this.autocomplete.trelloBoards.forEach(board => {
            lists = lists.concat(board.lists);
          });
          this.autocomplete.trelloLists.all = lists;
        })
    } else if (provider === 'SOCIOCORTEX') {
      this.taskService.getSociocortexWorkspaces()
        .take(1)
        .subscribe(workspaces => {
          this.autocomplete.sociocortexWorkspaces = workspaces;
          if (workspaces.length == 1) {
            this.form.get('context.sociocortexWorkspace').setValue(workspaces[0].id);
          }
        })
    }
  }

  onActionSelect() {
    this.formController.reset(["metadata", "context", "trelloContent", "sociocortexContent"]);
  }

  onBoardSelect(boardId: string) {
    this.formController.reset(["metadata", "trelloContent", "context.trelloTask", "context.trelloList"]);
    this.autocompleteController.updateTrelloAssignees(boardId);
    this.autocompleteController.filterTrelloLists(boardId);
  }

  onListSelect(listId: string) {
    this.formController.reset(["metadata", "trelloContent", "context.trelloTask"]);
    if (this.isLinkAction() && listId) {
      this.taskService.getTrelloTasks(listId)
        .take(1)
        .subscribe(tasks => this.autocompleteController.updateTrelloTasks(tasks));
    }
  }

  onTaskSelect(taskId: string) {
    this.formController.reset(["metadata"]);
    if (this.isTrelloProvider()) {
      this.formController.reset(["trelloContent"]);
      this.taskService.getTrelloTask(taskId)
        .take(1)
        .subscribe(task => this.formController.setTask(task));
    } else if (this.isSociocortexProvider()) {
      this.formController.reset(["sociocortexContent"]);
      this.taskService.getSociocortexMembers(taskId)
        .take(1)
        .subscribe(members => this.autocompleteController.updateSociocortexOwner(members));
      this.taskService.getSociocortexTask(taskId)
        .take(1)
        .subscribe(task => this.formController.setTask(task));
    }
  }

  onWorkspaceSelect(workspaceId: string) {
    this.formController.reset(["metadata", "sociocortexContent", "context.sociocortexCase", "context.sociocortexTask"]);
    this.taskService.getSociocortexCases(workspaceId)
      .take(1)
      .subscribe(cases => this.autocompleteController.updateSociocortexCases(cases));
  }

  onCaseSelect(caseId: string) {
    this.formController.reset(["metadata", "sociocortexContent"]);
    this.taskService.getSociocortexTasks(caseId)
      .take(1)
      .subscribe(tasks => {
        this.autocompleteController.updateSociocortexTasks(tasks, this.isCreateAction());
      });
  }

  onUnlink() {
    this.submitted = true;
    this.taskService.unlinkTask(this.formController.getTask()).subscribe(
      () => this.onSubmissionSuccess('Task successfully unlinked.'),
      error => this.onSubmissionFailure('Error while unlinking task.', error))
  }

  onSubmit(complete: boolean, terminate: boolean) {
    if (this.form.valid) {
      this.submitted = true;
      const convertedTask = this.formController.getTask();
      console.log("Form submit.", this.form, convertedTask);
      if (this.isEditMode)
        this.onEditSubmit(convertedTask, complete, terminate);
      else if (this.form.get('intent.intendedAction').value === 'LINK')
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

  private onSubmissionSuccess(message: string): void {
    this.closeDialog();
    this.snackBar.open(message, 'OK');
  }

  private onSubmissionFailure(message: string, error: Error): void {
    console.log(error);
    this.submitted = false;
    this.snackBar.open(message, 'OK');
  }

  private isCreateAction(): boolean {
    return this.form.get('intent.intendedAction').value === 'CREATE';
  }

  private isLinkAction(): boolean {
    return this.form.get('intent.intendedAction').value === 'LINK';
  }

  private isTrelloProvider(): boolean {
    return this.form.get('intent.provider').value === 'TRELLO';
  }

  private isSociocortexProvider(): boolean {
    return this.form.get('intent.provider').value === 'SOCIOCORTEX';
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
