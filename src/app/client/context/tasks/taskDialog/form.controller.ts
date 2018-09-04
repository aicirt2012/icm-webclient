import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Task } from '../../../../shared';
import { TaskService } from '../../../shared';
import { HtmlElements } from '../taskContentSociocortex';
import { Location } from '@angular/common';

export class FormController {

  private task: any;
  private email: any;
  private user: any;

  private form: FormGroup;

  constructor(private fb: FormBuilder,
              private location: Location) {
  }

  makeForm() {
    this.form = this.fb.group({
      title: this.fb.control('', Validators.required),
      intent: this.fb.group({
        provider: ['', Validators.required],
        intendedAction: ['', Validators.required],
      }),
      context: this.fb.group({
        trelloBoard: [''],
        trelloList: [''],
        trelloTask: [''],
        sociocortexWorkspace: [''],
        sociocortexCase: [''],
        sociocortexTask: ['']
      }),
      metadata: this.fb.group({
        dueDate: [null],
        dueDateUnformatted: [''],
        assignees: ['']
      }),
      trelloContent: this.fb.group({
        description: ['']
      }),
      sociocortexContent: this.fb.array([])
    }, {validator: FormController.validateForm});
    return this.form;
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

  setTask(task: Task): void {
    this.form.get('title').setValue(task.name);
    this.form.get('intent.provider').setValue(task.provider.toUpperCase());
    this.form.get('metadata.dueDate').setValue(new Date(task.due));
    if (this.form.get('intent.provider').value === 'TRELLO') {
      this.form.get('context.trelloBoard').setValue(TaskService.getParameter(task, 'idBoard'));
      this.form.get('context.trelloList').setValue(TaskService.getParameter(task, 'idList'));
      this.form.get('trelloContent.description').setValue(TaskService.getParameter(task, 'desc'));
      this.form.get('metadata.assignees').setValue(task.assignees.map(assignee => assignee.id));
    } else {
      this.form.get('context.sociocortexCase').setValue(TaskService.getParameter(task, 'case'));
      this.form.get('context.sociocortexTask').setValue(task.providerId);
      if (task.assignees && task.assignees.length > 0)
      // only one owner allowed for SC tasks
        this.form.get('metadata.assignees').setValue(task.assignees[0].id);
    }
  }

  getTask(): Task {
    return null;
  }

  getTask_temp(email: any, user: any, sociocortexParams: any[], task?: Task) {
    const intent = (<FormGroup> this.form.controls.intent).controls;
    const metadata = (<FormGroup> this.form.controls.metadata).controls;
    const newTask = task ? task : new Task();

    newTask.email = email._id;
    newTask.user = user._id;
    newTask.name = this.form.controls.title.value;
    newTask.frontendUrl = "http://localhost:3000" + this.location.prepareExternalUrl(this.location.path());    //FIXME replace hardcoded base url with actual, dynamic one
    newTask.due = metadata.dueDate.value ? metadata.dueDate.value : undefined;
    newTask.isOpen = true;
    newTask.provider = intent.provider.value;

    if (newTask.provider === 'TRELLO') {
      if (intent.intendedAction.value === 'LINK')
        newTask.providerId = (<FormGroup> this.form.controls.context).controls.trelloTask.value;
      newTask.parameters = this.convertTaskParametersTrello();
      newTask.assignees = metadata.assignees.value ? metadata.assignees.value : undefined;
    } else if (newTask.provider === 'SOCIOCORTEX') {
      newTask.providerId = (<FormGroup> this.form.controls.context).controls.sociocortexTask.value;
      newTask.parameters = this.convertTaskParametersSociocortex(sociocortexParams, newTask);
      newTask.assignees = metadata.assignees.value ? [metadata.assignees.value] : undefined;
    }
    return newTask;
  }

  private convertTaskParametersTrello() {
    const context = (<FormGroup> this.form.controls.context).controls;
    const content = (<FormGroup> this.form.controls.trelloContent).controls;
    const metadata = (<FormGroup> this.form.controls.metadata).controls;
    const parameters = [];
    // context information
    parameters.push({name: "idBoard", value: context.trelloBoard.value});
    parameters.push({name: "idList", value: context.trelloList.value});
    parameters.push({name: "idMembers", value: metadata.assignees.value});
    // task content
    parameters.push({name: "desc", value: content.description.value});
    return parameters;
  }

  private convertTaskParametersSociocortex(sociocortexParams, task: any) {
    const context = (<FormGroup> this.form.controls.context).controls;
    const content = (<FormArray> this.form.controls.sociocortexContent).controls;
    const parameters = [];
    console.log("convert params sc", content);
    // context information
    parameters.push({name: "case", value: context.sociocortexCase.value});
    parameters.push({name: "state", value: TaskService.getParameter(task, 'state')});
    parameters.push({
      name: "resourceType",
      value: TaskService.getParameter(task, 'resourceType')
    });
    // task content
    const contentParams = [];
    for (let i = 0; i < content.length; i++) {
      contentParams.push(this.convertTaskParameterSociocortex(i, content, sociocortexParams));
    }
    parameters.push({name: "contentParams", value: contentParams});
    return parameters;
  }

  private convertTaskParameterSociocortex(paramIndex: number, content, sociocortexParams) {
    const values = [];
    if (sociocortexParams[paramIndex].htmlElement === HtmlElements.CheckBoxes)
    // checkbox group
      for (let enumIndex = 0; enumIndex < (<FormArray> content[paramIndex]).length; enumIndex++) {
        const option = sociocortexParams[paramIndex].constraints.enumerationOptions[enumIndex];
        if ((<FormArray> content[paramIndex]).controls[enumIndex].value)
          values.push(option.value);
      }
    else if (content[paramIndex].value)
    // simple inputs
      values.push(content[paramIndex].value);
    return {
      id: sociocortexParams[paramIndex].id,
      name: sociocortexParams[paramIndex].name,
      values: values
    };
  }

  showValidationErrors() {
    Object.keys(this.form.controls).forEach(field => {
      this.validateFormField(this.form.get(field));
    });
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

}
