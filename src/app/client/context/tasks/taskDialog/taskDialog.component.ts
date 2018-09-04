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
  public task: any;
  public email: any;
  public user: any;
  public suggestedData: { titles: any[], dates: any[], mentionedPersons: any[] };

  private sociocortexParams: any[];

  loading: any = {
    trello: false,
    sociocortex: false
  };
  submitted: boolean = false;

  private autocomplete;
  private form: FormGroup;

  private formController: FormController;
  private autocompleteController: AutocompleteController;

  constructor(public taskDialogRef: MatDialogRef<TaskDialogComponent>,
              private snackBar: MatSnackBar,
              private taskService: TaskService,
              formBuilder: FormBuilder,
              location: Location) {
    this.formController = new FormController(formBuilder, location);
    this.autocompleteController = new AutocompleteController(this.taskService);
  }

  initDialog(task: any, email: any, user: any, isEditMode: boolean) {
    this.task = task;
    this.email = email;
    this.suggestedData = email.suggestedData;
    this.user = user;
    this.isEditMode = isEditMode;
  }

  ngOnInit() {
    this.form = this.formController.makeForm();
    this.autocomplete = this.autocompleteController.getModel();
    this.autocompleteController.initAutocompleteData(this.task, this.isEditMode, this.suggestedData, this.form);
    this.initInputCallbacks();
    if (this.task) {
      this.formController.setTask(this.task);
      this.sociocortexParams = TaskService.getParameter(this.task, 'contentParams');
    }
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
    this.form.get("intent.intendedAction").reset();
    this.form.get("context").reset();
    this.form.get("metadata").reset();
    this.form.get("trelloContent").reset();
    this.form.get("sociocortexContent").reset();
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
    this.form.get("context").reset();
    this.form.get("metadata").reset();
    this.form.get("trelloContent").reset();
    this.form.get("sociocortexContent").reset();
  }

  onBoardSelect(boardId: string) {
    this.form.get("context.trelloList").reset();
    this.form.get("context.trelloTask").reset();
    this.form.get("metadata").reset();
    this.form.get("trelloContent").reset();
    this.autocompleteController.updateTrelloAssigneeAutocomplete(boardId, this.suggestedData);
    const lists = this.autocomplete.trelloLists;
    lists.relevant = lists.all.filter(list => list.idBoard === boardId);
  }

  onListSelect(listId: string) {
    this.form.get("context.trelloTask").reset();
    this.form.get("metadata").reset();
    this.form.get("trelloContent").reset();
    if (this.form.get('intent.intendedAction').value === 'LINK' && listId) {
      this.taskService.getTrelloTasks(listId)
        .take(1)
        .subscribe(tasks => this.autocomplete.trelloTasks = tasks.filter(task => task.isOpen));
    }
  }

  onTaskSelect(taskId: string) {
    this.form.get("metadata").reset();
    if (this.form.get('intent.provider').value === 'TRELLO') {
      this.form.get("trelloContent").reset();
      this.taskService.getTrelloTask(taskId)
        .take(1)
        .subscribe(task => {
          this.task = task;
          this.formController.setTask(task);
        });
    } else {
      this.form.get("sociocortexContent").reset();
      this.taskService.getSociocortexMembers(taskId)
        .take(1)
        .subscribe(members => {
          const mentionedMembers = [], otherMembers = [];
          members.forEach(member => {
            let isMentioned = this.suggestedData.mentionedPersons
              .some(nameString => member.fullName.indexOf(nameString) > -1);
            if (isMentioned)
              mentionedMembers.push(member);
            else
              otherMembers.push(member);
          });
          this.autocomplete.owner.other = otherMembers;
          this.autocomplete.owner.suggested = mentionedMembers;
        });
      this.taskService.getSociocortexTask(taskId)
        .take(1)
        .subscribe(task => {
          console.log(task);
          this.task = task;
          this.formController.setTask(task);
          this.sociocortexParams = TaskService.getParameter(task, 'contentParams');
        });
    }
  }

  onWorkspaceSelect(workspaceId: string) {
    this.form.get("context.sociocortexCase").reset();
    this.form.get("context.sociocortexTask").reset();
    this.form.get("metadata").reset();
    this.form.get("sociocortexContent").reset();
    this.taskService.getSociocortexCases(workspaceId)
      .take(1)
      .subscribe(cases => {
        this.autocomplete.sociocortexCases.relevant = cases;
      });
  }

  onCaseSelect(caseId: string) {
    this.form.get("metadata").reset();
    this.form.get("sociocortexContent").reset();
    this.taskService.getSociocortexTasks(caseId)
      .take(1)
      .subscribe(tasks => {
        if (this.form.get('intent.intendedAction').value === 'LINK')
          this.autocomplete.sociocortexTasks.relevant = tasks
            .filter(task => task.isOpen);
        else
          this.autocomplete.sociocortexTasks.relevant = tasks
            .filter(task => TaskService.getParameter(task, 'state') === 'ENABLED');
      });
  }

  onUnlink() {
    this.submitted = true;
    this.taskService.unlinkTask(this.task)
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open('Task successfully unlinked.', 'OK');
      }, error => {
        console.log(error);
        this.submitted = false;
        this.snackBar.open('Error while unlinking task.', 'OK');
      })
  }

  onSubmit(complete: boolean, terminate: boolean) {
    if (this.form.valid) {
      this.submitted = true;
      const convertedTask = this.formController.getTask_temp(this.email, this.user, this.task);
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
      else {
        this.closeDialog();
        this.snackBar.open('Task successfully updated.', 'OK');
      }
    }, error => {
      console.log(error);
      this.submitted = false;
      this.snackBar.open('Error while updating task.', 'OK');
    });
  }

  private onCompleteSubmit(taskId) {
    if (this.form.get('intent.provider').value === 'SOCIOCORTEX')
      this.taskService.completeSociocortexTask(taskId).subscribe(() => {
        this.closeDialog();
        this.snackBar.open('Task successfully completed.', 'OK');
      }, error => {
        console.log(error);
        this.submitted = false;
        this.snackBar.open('Error while completing task.', 'OK');
      });
    else if (this.form.get('intent.provider').value === 'TRELLO')
      this.taskService.archiveTrelloTask(taskId).subscribe(() => {
        this.closeDialog();
        this.snackBar.open('Task successfully archived.', 'OK');
      }, error => {
        console.log(error);
        this.submitted = false;
        this.snackBar.open('Error while archiving task.', 'OK');
      });
  }

  private onTerminateSubmit(taskId) {
    if (this.form.get('intent.provider').value === 'SOCIOCORTEX')
      this.taskService.terminateSociocortexTask(taskId).subscribe(() => {
        this.closeDialog();
        this.snackBar.open('Task successfully terminated.', 'OK');
      }, error => {
        console.log(error);
        this.submitted = false;
        this.snackBar.open('Error while terminating task.', 'OK');
      });
    else if (this.form.get('intent.provider').value === 'TRELLO')
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.closeDialog();
        this.snackBar.open('Task successfully deleted.', 'OK');
      }, error => {
        console.log(error);
        this.submitted = false;
        this.snackBar.open('Error while deleting task.', 'OK');
      });
  }

  private onLinkSubmit(convertedTask) {
    this.taskService.linkTask(convertedTask).subscribe(() => {
      this.closeDialog();
      this.snackBar.open('Task successfully linked.', 'OK');
    }, error => {
      console.log(error);
      this.submitted = false;
      this.snackBar.open('Error while linking task.', 'OK');
    });
  }

  private onCreateSubmit(convertedTask) {
    this.taskService.createTask(convertedTask).subscribe(() => {
      this.closeDialog();
      this.snackBar.open('Task successfully created.', 'OK');
    }, error => {
      console.log(error);
      this.submitted = false;
      this.snackBar.open('Error while creating task.', 'OK');
    });
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
