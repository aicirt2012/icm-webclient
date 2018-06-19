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

  private provider: string = "";
  private intendedAction: string;

  private title: string = "(Untitled Task)";
  private dueDate: string;
  private members: any[] = [];
  private state: string;

  providerSelectionForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(public taskDialogRef: MatDialogRef<NewTaskDialogComponent>,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.providerSelectionForm = this._formBuilder.group({
      provider: ['', Validators.required],
      intendedAction: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

}
