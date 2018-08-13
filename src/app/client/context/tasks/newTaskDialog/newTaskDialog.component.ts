import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from '../../../shared';
import { Task } from '../../../../shared';

@Component({
  selector: 'new-task-dialog',
  styleUrls: ['./newTaskDialog.component.css'],
  templateUrl: './newTaskDialog.component.html'
})

export class NewTaskDialogComponent {

  public task: any;
  public email: any;
  public user: any;
  public suggestedData: any[] = [];

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
    trelloTasks: {
      all: [],
      relevant: []
    },
    assignees: {
      suggested: [],
      other: []
    },
    sociocortexWorkspaces: [],
    sociocortexCases: {
      all: [],
      relevant: [],
      filtered: []
    },
    sociocortexTasks: {
      all: [],
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
    intent: this._formBuilder.group({
      title: ['', Validators.required],
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
  }, {validator: NewTaskDialogComponent.validateForm});

  constructor(public taskDialogRef: MatDialogRef<NewTaskDialogComponent>,
              public snackBar: MatSnackBar,
              private taskService: TaskService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form.get('metadata.dueDateUnformatted').valueChanges
      .subscribe(date => {
        this.form.get('metadata.dueDate').setValue(TaskService.formatDate(date));
      });
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

  onSubmit() {
    console.log("Submit!");
    console.log(this.form);
    this.submitted = true;

    this.taskService.createTask(this.getTaskObject()).subscribe(() => {
      this.closeDialog();
      this.snackBar.open('Task successfully created.', 'OK');
    }, error => {
      console.log(error);
      this.submitted = false;
      this.snackBar.open('Error while creating task.', 'OK');
    });
  }

  getTaskObject() {
    const intent = (<FormGroup> this.form.controls.intent).controls;
    const metadata = (<FormGroup> this.form.controls.metadata).controls;
    const task = new Task();

    task.email = this.email._id;
    task.user = this.user._id;
    task.name = intent.title.value;
    task.due = metadata.dueDate.value ? metadata.dueDate.value : undefined;
    task.assignees = metadata.assignees.value ? metadata.assignees.value : undefined;
    task.isOpen = true;
    task.provider = intent.provider.value;

    if (task.provider === 'TRELLO') {
      if (intent.intendedAction.value === 'LINK')
        task.providerId = (<FormGroup> this.form.controls.context).controls.trelloTask.value;
      task.parameters = this.getTaskParametersTrello();
    } else if (task.provider === 'SOCIOCORTEX') {
      task.parameters = this.getTaskParametersSociocortex();
    }
    return task;
  }

  private getTaskParametersTrello() {
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

  private getTaskParametersSociocortex() {
    const context = (<FormGroup> this.form.controls.context).controls;
    const content = (<FormGroup> this.form.controls.sociocortexContent).controls;
    const parameters = [];
    // context information
    parameters.push({name: "case", value: context.trelloList.value});
    // task content
    parameters.push({name: "description", value: content.description.value});
    return parameters;
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
