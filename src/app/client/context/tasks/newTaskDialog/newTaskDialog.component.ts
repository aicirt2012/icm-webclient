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

  providerSelectionGroup: FormGroup;
  parentSelectionGroup: FormGroup;
  primaryDataInputGroup: FormGroup;
  additionalDataInputGroup: FormGroup;

  constructor(public taskDialogRef: MatDialogRef<NewTaskDialogComponent>,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.providerSelectionGroup = this._formBuilder.group({
      provider: ['', Validators.required],
      intendedAction: ['', Validators.required]
    });
    this.parentSelectionGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.primaryDataInputGroup = this._formBuilder.group({
      title: ['(Untitled Task)', Validators.required],
      // dueDate: ['', Validators.required],
      // members: ['', Validators.required],
      // state: ['', Validators.required],
    });
    this.additionalDataInputGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
