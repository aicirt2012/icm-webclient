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
    trelloTasks: [],
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

  onProviderSelect(provider: string) {
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
      // TODO load sc workspaces
    }
  }

  onBoardSelect(boardId: string) {
    this.taskService.getTrelloMembers(boardId)
      .take(1)
      .subscribe(members => this.autocomplete.assignees.other = members);
    const lists = this.autocomplete.trelloLists;
    lists.relevant = lists.all.filter(list => list.idBoard === boardId);
  }

  onListSelect(listId: string) {
    if (this.form.get('intent.intendedAction').value === 'LINK' && listId) {
      this.taskService.getTrelloTasks(listId)
        .take(1)
        .subscribe(tasks => this.autocomplete.trelloTasks = tasks);
    }
  }

  onTaskSelect(taskId: string) {
    this.taskService.getTrelloTask(taskId)
      .take(1)
      .subscribe(task => {
        this.applyTaskObjectToForm(task);
      });
  }

  onWorkspaceSelect(workspaceId: string) {
    // TODO filter cases for workspaceId
  }

  onCaseSelect(caseId: string) {
    // TODO filter tasks by caseId
  }

  onSubmit() {
    console.log("Submit!");
    console.log(this.form);
    this.submitted = true;

    this.taskService.createTask(this.convertFormToTaskObject()).subscribe(() => {
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

  applyTaskObjectToForm(task: Task) {
    this.form.get('intent.title').setValue(task.name);
    this.form.get('metadata.dueDate').setValue(TaskService.formatDate(task.due));
    this.form.get('metadata.assignees').setValue(task.assignees);
    this.form.get('trelloContent.description').setValue(TaskService.getParameter(task, 'desc'));
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
