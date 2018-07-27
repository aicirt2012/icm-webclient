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
  public isSuggestion: boolean = false;

  intentGroup: FormGroup;
  contextGroup: FormGroup;
  metadataGroup: FormGroup;
  contentGroup: FormGroup;

  constructor(public taskDialogRef: MatDialogRef<NewTaskDialogComponent>,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.intentGroup = this._formBuilder.group({
      title: ['(Untitled Task)', Validators.required],
      provider: ['', Validators.required],
      intendedAction: ['', Validators.required],
    });
    this.contextGroup = this._formBuilder.group({
      trelloBoard: [''],
      trelloList: [''],
      trelloTask: [''],
      sociocortexWorkspace: [''],
      sociocortexCase: [''],
      sociocortexTask: ['']
    }, {validator: this.validateBasicMetadata});
    this.metadataGroup = this._formBuilder.group({
      dueDate: [''],
      assignees: [''],
      provider3: ['', Validators.required],
      intendedAction3: ['', Validators.required]
    });
    this.contentGroup = this._formBuilder.group({
      provider4: ['', Validators.required],
      intendedAction4: ['', Validators.required]
    });
  }

  validateBasicMetadata() {
    // NOT NULL CHECKS
    if (!this || !this.intentGroup || !this.intentGroup.controls || !this.contextGroup || !this.contextGroup.controls)
      return {'error': true};
    const intentGroup = this.intentGroup.controls;
    const group = this.contextGroup.controls;
    // TRELLO VALIDATIONS
    if (intentGroup['provider'].value === 'TRELLO') {
      if (!group['trelloBoard'].value || !group['trelloList'].value)
        return {'error': true};
      if (intentGroup['intendedAction'].value === 'LINK' && !group['trelloTask'].value)
        return {'error': true};
    }
    //SOCIOCORTEX VALIDATIONS
    if (intentGroup.controls['provider'].value === 'SOCIOCORTEX') {
      if (!group.controls['sociocortexWorkspace'].value ||!group.controls['sociocortexCase'].value)
        return {'error': true};
      if (intentGroup.controls['intendedAction'].value === 'LINK' && !group.controls['sociocortexTask'].value)
        return {'error': true};
    }
    return null;
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
