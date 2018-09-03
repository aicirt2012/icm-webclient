import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../../shared';
import { TaskService } from '../../../shared';

export class FormController {

  private form: FormGroup;

  constructor(private fb: FormBuilder) {
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

  applyTaskObjectToForm(task: Task) {
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

}
