import { Component, Renderer2 } from '@angular/core';
import { MatDialogRef, MatSnackBar } from "@angular/material";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { TaskService } from '../../../shared';
import { Task } from '../../../../shared';
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

  private autocomplete = {
    titles: {
      all: [],
      filtered: []
    },
    trelloBoards: [],
    trelloLists: {
      all: [],
      relevant: []
    },
    trelloTasks: [],
    assignees: {
      suggested: [],
      other: []
    },
    sociocortexWorkspaces: [],
    sociocortexCases: {
      relevant: [],
      filtered: []
    },
    sociocortexTasks: {
      relevant: [],
      filtered: []
    },
    owner: {
      suggested: [],
      other: []
    },
    dates: {
      all: [],
      filtered: []
    }
  };

  loading: any = {
    trello: false,
    sociocortex: false
  };
  submitted: boolean = false;

  form: FormGroup = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    intent: this._formBuilder.group({
      provider: ['', Validators.required],
      intendedAction: ['', Validators.required],
    }),
    context: this._formBuilder.group({
      trelloBoard: [''],
      trelloList: [''],
      trelloTask: [''],
      sociocortexWorkspace: [''],
      sociocortexCase: [''],
      sociocortexTask: ['']
    }),
    metadata: this._formBuilder.group({
      dueDate: [''],
      dueDateUnformatted: [''],
      assignees: ['']
    }),
    trelloContent: this._formBuilder.group({
      description: ['']
    }),
    sociocortexContent: this._formBuilder.array([])
  }, {validator: TaskDialogComponent.validateForm});

  constructor(public taskDialogRef: MatDialogRef<TaskDialogComponent>,
              public snackBar: MatSnackBar,
              private taskService: TaskService,
              private location: Location,
              private renderer: Renderer2,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initAutocompleteData();
    this.initInputCallbacks();
    if (this.task)
      this.applyTaskObjectToForm(this.task);
  }

  private initAutocompleteData() {
    if (this.isEditMode) {
      this.form.get('intent.intendedAction').setValue("CREATE");  // value does not matter, just need any for form to be valid
      if (this.task.provider.toUpperCase() === 'TRELLO') {
        this.autocomplete.trelloBoards = [TaskService.getParameter(this.task, 'board')];
        this.autocomplete.trelloLists.relevant = [TaskService.getParameter(this.task, 'list')];
        this.updateTrelloAssigneeAutocomplete(TaskService.getParameter(this.task, 'idBoard'));
      } else if (this.task.provider.toUpperCase() === 'SOCIOCORTEX') {
        this.autocomplete.sociocortexTasks.relevant = [this.task];
        this.taskService.getSociocortexWorkspaces()
          .take(1)
          .subscribe(workspaces => {
            this.autocomplete.sociocortexWorkspaces = workspaces;
          });
        this.taskService.getSociocortexCase(TaskService.getParameter(this.task, 'case'))
          .take(1)
          .subscribe(scCase => {
            this.autocomplete.sociocortexCases.relevant = [scCase];
            this.form.get('context.sociocortexWorkspace').setValue(scCase.workspace);   // TODO move this call away from this method (not autocomplete related)
          });
        this.taskService.getSociocortexMembers(this.task.providerId)
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
      }
    }
    this.autocomplete.titles.all = this.suggestedData.titles;
    this.autocomplete.dates.all = this.suggestedData.dates;
    this.autocomplete.titles.filtered = this.autocomplete.titles.all;
    this.autocomplete.dates.filtered = this.autocomplete.dates.all;
  }

  private initInputCallbacks() {
    this.form.get('metadata.dueDateUnformatted').valueChanges
      .subscribe(date => {
        this.form.get('metadata.dueDate').setValue(TaskService.formatDate(date));
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

  applyTaskObjectToForm(task: Task) {
    this.form.get('title').setValue(task.name);
    this.form.get('intent.provider').setValue(task.provider.toUpperCase());
    this.form.get('metadata.dueDate').setValue(TaskService.formatDate(task.due));
    if (this.form.get('intent.provider').value === 'TRELLO') {
      this.form.get('context.trelloBoard').setValue(TaskService.getParameter(task, 'idBoard'));
      this.form.get('context.trelloList').setValue(TaskService.getParameter(task, 'idList'));
      this.form.get('trelloContent.description').setValue(TaskService.getParameter(task, 'desc'));
      this.form.get('metadata.assignees').setValue(task.assignees.map(assignee => assignee.id));
    } else {
      this.form.get('context.sociocortexCase').setValue(TaskService.getParameter(task, 'case'));
      this.form.get('context.sociocortexTask').setValue(task.providerId);
      this.sociocortexParams = TaskService.getParameter(task, 'contentParams');
      if (task.assignees && task.assignees.length > 0)
      // only one owner allowed for SC tasks
        this.form.get('metadata.assignees').setValue(task.assignees[0].id);
    }
  }

  static validateForm(group: FormGroup) {
    // NOT NULL CHECKS
    if (!group || !group.controls.intent || !group.controls.context)
      return {'error': true};
    const intent = (<FormGroup> group.controls.intent).controls;
    const context = (<FormGroup> group.controls.context).controls;
    if (!intent || !context)
      return {'error': true};
    // TRELLO VALIDATIONS
    if (intent['provider'].value === 'TRELLO') {
      if (!context['trelloBoard'].value || !context['trelloList'].value)
        return {'error': true};
      if (intent['intendedAction'].value === 'LINK' && !context['trelloTask'].value)
        return {'error': true};
    }
    //SOCIOCORTEX VALIDATIONS
    if (intent['provider'].value === 'SOCIOCORTEX') {
      if (!context['sociocortexWorkspace'].value || !context['sociocortexCase'].value)
        return {'error': true};
      if (intent['intendedAction'].value === 'LINK' && !context['sociocortexTask'].value)
        return {'error': true};
    }
    return null;
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
    this.updateTrelloAssigneeAutocomplete(boardId);
    const lists = this.autocomplete.trelloLists;
    lists.relevant = lists.all.filter(list => list.idBoard === boardId);
  }

  private updateTrelloAssigneeAutocomplete(boardId: string) {
    this.taskService.getTrelloMembers(boardId)
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
        this.autocomplete.assignees.other = otherMembers;
        this.autocomplete.assignees.suggested = mentionedMembers;
      });
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
          this.applyTaskObjectToForm(task);
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
          this.applyTaskObjectToForm(task);
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

  onSubmit(complete: boolean, terminate: boolean) {
    if (this.form.valid) {
      this.submitted = true;
      const convertedTask = this.convertFormToTaskObject();
      console.log("Form submit.", this.form, convertedTask);
      if (this.isEditMode) {
        this.onEditSubmit(convertedTask, complete, terminate);
      } else {
        if (this.form.get('intent.intendedAction').value === 'LINK') {
          this.onLinkSubmit(convertedTask);
        } else {
          this.onCreateSubmit(convertedTask);
        }
      }
    } else {
      Object.keys(this.form.controls).forEach(field => {
        this.validateFormField(this.form.get(field));
      });
    }
  }

  private onEditSubmit(convertedTask, complete: boolean, terminate: boolean) {
    this.taskService.linkTask(convertedTask).subscribe(() => {
      if (complete) {
        this.onCompleteSubmit(convertedTask._id);
      } else if (terminate) {
        this.onTerminateSubmit(convertedTask._id)
      } else {
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

  convertFormToTaskObject() {
    const intent = (<FormGroup> this.form.controls.intent).controls;
    const metadata = (<FormGroup> this.form.controls.metadata).controls;
    const task = this.task ? this.task : new Task();

    task.email = this.email._id;
    task.user = this.user._id;
    task.name = this.form.controls.title.value;
    task.frontendUrl = "http://localhost:3000" + this.location.prepareExternalUrl(this.location.path());    //FIXME replace hardcoded base url with actual, dynamic one
    task.due = metadata.dueDate.value ? metadata.dueDate.value : undefined;
    task.isOpen = true;
    task.provider = intent.provider.value;

    if (task.provider === 'TRELLO') {
      if (intent.intendedAction.value === 'LINK')
        task.providerId = (<FormGroup> this.form.controls.context).controls.trelloTask.value;
      task.parameters = this.convertTaskParametersTrello();
      task.assignees = metadata.assignees.value ? metadata.assignees.value : undefined;
    } else if (task.provider === 'SOCIOCORTEX') {
      task.providerId = (<FormGroup> this.form.controls.context).controls.sociocortexTask.value;
      task.parameters = this.convertTaskParametersSociocortex();
      task.assignees = metadata.assignees.value ? [metadata.assignees.value] : undefined;
    }
    return task;
  }

  validateFormField(control: AbstractControl) {
    if (control instanceof FormControl) {
      control.markAsTouched({onlySelf: true});
    } else if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(field => {
        this.validateFormField(control.get(field));
      });
    } else if (control instanceof FormArray) {
      control.controls.forEach(subControl => {
        this.validateFormField(subControl);
      });
    }
  }

  private convertTaskParametersTrello() {
    const context = (<FormGroup> this.form.controls.context).controls;
    const content = (<FormGroup> this.form.controls.trelloContent).controls;
    const parameters = [];
    // context information
    parameters.push({name: "idBoard", value: context.trelloBoard.value});
    parameters.push({name: "idList", value: context.trelloList.value});
    // task content
    parameters.push({name: "desc", value: content.description.value});
    return parameters;
  }

  private convertTaskParametersSociocortex() {
    const context = (<FormGroup> this.form.controls.context).controls;
    const content = (<FormGroup> this.form.controls.sociocortexContent).controls;
    const parameters = [];
    // context information
    parameters.push({name: "case", value: context.sociocortexCase.value});
    // task content
    // parameters.push({name: "description", value: content.description.value});
    return parameters;
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
