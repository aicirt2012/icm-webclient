import { Component, Renderer2 } from '@angular/core';
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from '../../../shared';
import { Task } from '../../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'task-dialog',
  styleUrls: ['./taskDialog.component.css'],
  templateUrl: './taskDialog.component.html'
})

export class TaskDialogComponent {

  public task: any;
  public email: any;
  public user: any;
  public suggestedData: { titles: any[], dates: any[], mentionedPersons: any[] };

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
              private router: Router,
              private renderer: Renderer2,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.autocomplete.titles.all = this.suggestedData.titles;
    this.autocomplete.dates.all = this.suggestedData.dates;
    this.autocomplete.titles.filtered = this.autocomplete.titles.all;
    this.autocomplete.dates.filtered = this.autocomplete.dates.all;
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

  onBoardSelect(boardId: string) {
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
    const lists = this.autocomplete.trelloLists;
    lists.relevant = lists.all.filter(list => list.idBoard === boardId);
  }

  onListSelect(listId: string) {
    if (this.form.get('intent.intendedAction').value === 'LINK' && listId) {
      this.taskService.getTrelloTasks(listId)
        .take(1)
        .subscribe(tasks => this.autocomplete.trelloTasks = tasks.filter(task => task.isOpen));
    }
  }

  onTaskSelect(taskId: string) {
    if (this.form.get('intent.provider').value === 'TRELLO') {
      this.taskService.getTrelloTask(taskId)
        .take(1)
        .subscribe(task => {
          this.applyTaskObjectToForm(task);
        });
    } else {
      this.taskService.getSociocortexMembers(taskId)
        .take(1)
        .subscribe(members => {
          const mentionedMembers = [], otherMembers = [];
          members.forEach(member => {
            let isMentioned = this.suggestedData.mentionedPersons
              .some(nameString => member.name.indexOf(nameString) > -1);
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
        });
    }
  }

  onWorkspaceSelect(workspaceId: string) {
    this.taskService.getSociocortexCases(workspaceId)
      .take(1)
      .subscribe(cases => {
        this.autocomplete.sociocortexCases.relevant = cases;
      });
  }

  onCaseSelect(caseId: string) {
    this.taskService.getSociocortexTasks(caseId)
      .take(1)
      .subscribe(tasks => {
        if (this.form.get('intent.intendedAction').value === 'LINK')
          this.autocomplete.sociocortexTasks.relevant = tasks.filter(task => task.isOpen);
        else
          this.autocomplete.sociocortexTasks.relevant = tasks.filter(task => task.getParameter('state') === 'ENABLED');
      });
  }

  onSubmit() {
    console.log("Submit!");
    console.log(this.form);
    this.submitted = true;

    if (this.form.get('intent.intendedAction').value === 'LINK') {
      this.taskService.linkTask(this.convertFormToTaskObject()).subscribe(() => {
        this.closeDialog();
        this.snackBar.open('Task successfully linked.', 'OK');
      }, error => {
        console.log(error);
        this.submitted = false;
        this.snackBar.open('Error while linking task.', 'OK');
      });
    } else {
      this.taskService.createTask(this.convertFormToTaskObject()).subscribe(() => {
        this.closeDialog();
        this.snackBar.open('Task successfully created.', 'OK');
      }, error => {
        console.log(error);
        this.submitted = false;
        this.snackBar.open('Error while creating task.', 'OK');
      });
    }
  }

  convertFormToTaskObject() {
    const intent = (<FormGroup> this.form.controls.intent).controls;
    const metadata = (<FormGroup> this.form.controls.metadata).controls;
    const task = new Task();

    task.email = this.email._id;
    task.user = this.user._id;
    task.name = this.form.controls.title.value;
    task.frontendUrl = this.router.url;
    task.due = metadata.dueDate.value ? metadata.dueDate.value : undefined;
    task.isOpen = true;
    task.provider = intent.provider.value;

    if (task.provider === 'TRELLO') {
      if (intent.intendedAction.value === 'LINK')
        task.providerId = (<FormGroup> this.form.controls.context).controls.trelloTask.value;
      task.parameters = this.getTaskParametersTrello();
      task.assignees = metadata.assignees.value ? metadata.assignees.value : undefined;
    } else if (task.provider === 'SOCIOCORTEX') {
      if (intent.intendedAction.value === 'LINK')
        task.providerId = (<FormGroup> this.form.controls.context).controls.sociocortexTask.value;
      task.parameters = this.getTaskParametersSociocortex();
      task.assignees = metadata.assignees.value ? [metadata.assignees.value] : undefined;
    }
    return task;
  }

  applyTaskObjectToForm(task: Task) {
    this.form.get('title').setValue(task.name);
    this.form.get('metadata.dueDate').setValue(TaskService.formatDate(task.due));
    this.form.get('trelloContent.description').setValue(TaskService.getParameter(task, 'desc'));
    if (this.form.get('intent.provider').value === 'TRELLO') {
      this.form.get('metadata.assignees').setValue(task.assignees);
    } else {
      if (task.assignees && task.assignees.length > 0)
      // only one owner allowed for SC tasks
        this.form.get('metadata.assignees').setValue(task.assignees[0]);
    }
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
    parameters.push({name: "case", value: context.sociocortexCase.value});
    // task content
    // parameters.push({name: "description", value: content.description.value});
    return parameters;
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
