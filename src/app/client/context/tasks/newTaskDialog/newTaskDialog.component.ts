import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'new-task-dialog',
  styleUrls: ['./newTaskDialog.component.css'],
  templateUrl: './newTaskDialog.component.html'
})

export class NewTaskDialogComponent {

  public task: any;
  public suggestedData: any[] = [];

  form: FormGroup = this._formBuilder.group({
    intent: this._formBuilder.group({
      title: ['(Untitled Task)', Validators.required],
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
      assignees: ['']
    }),
    trelloContent: this._formBuilder.group({
      trelloDescription: ['']
    }),
    sociocortexContent: this._formBuilder.array([])
  }, {validator: NewTaskDialogComponent.validateForm});

  constructor(public taskDialogRef: MatDialogRef<NewTaskDialogComponent>,
              private _formBuilder: FormBuilder) {
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

  closeDialog() {
    this.taskDialogRef.close();
  }

}
