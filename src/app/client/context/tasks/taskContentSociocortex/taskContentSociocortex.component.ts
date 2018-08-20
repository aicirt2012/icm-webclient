import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'task-content-sociocortex',
  styleUrls: ['./taskContentSociocortex.component.css'],
  templateUrl: './taskContentSociocortex.component.html'
})

export class TaskContentSociocortexComponent {

  @Input()
  private contentForm: FormArray;
  private _taskParams: any[];

  get taskParams(): any[] {
    return this._taskParams;
  }

  @Input()
  set taskParams(taskParams: any[]) {
    this._taskParams = taskParams;
    this.preProcessParameters();
    console.log("Preprocessed parameters.", this._taskParams, this.contentForm);
  }

  constructor(private fb: FormBuilder) {
  }

  private preProcessParameters() {
    // clear form controls
    while (this.contentForm.length > 0) {
      this.contentForm.removeAt(0);
    }
    // initialize form controls
    this._taskParams.forEach(taskParam => {
      if (taskParam.required)
        this.contentForm.push(this.fb.control(['', Validators.required]));
      else
        this.contentForm.push(this.fb.control(['']));
      switch (taskParam.type) {
        case "enumeration":
          if (taskParam.multiplicity === 'exactlyOne')
            taskParam.htmlElement = "radioboxes";
          else if (taskParam.multiplicity === 'atLeastOne') {
            taskParam.htmlElement = "checkboxes";
            const checkboxControls = [];
            taskParam.constraints.enumerationOptions.forEach(() =>
              checkboxControls.push(this.fb.control(['']))
            );
            const array = this.fb.array(checkboxControls, TaskContentSociocortexComponent.validateArrayAtLeastOne);
            this.contentForm.setControl(this.contentForm.length - 1, array);
          } else if (taskParam.multiplicity === 'any') {
            taskParam.htmlElement = "checkboxes";
            this.contentForm.removeAt(this.contentForm.length - 1);
            const array = this.fb.array(['']);
            taskParam.constraints.enumerationOptions.forEach(() => array.push(this.fb.control([])));
            this.contentForm.push(array);
          } else
            console.error("Unknown multiplicity for parameter type enumeration", taskParam);
          break;
        case "string":
          if (taskParam.multiplicity === 'exactlyOne')
            taskParam.htmlElement = "textinput";
          else if (!taskParam.multiplicity)
            taskParam.htmlElement = "textinput";
          else
            console.error("Unknown multiplicity for parameter type string", taskParam);
          break;
        case "date":
          if (taskParam.multiplicity === 'exactlyOne')
            taskParam.htmlElement = "datepicker";
          else
            console.error("Unknown multiplicity for parameter type date", taskParam);
          break;
        case "link":
          if (taskParam.multiplicity === 'exactlyOne')
            taskParam.htmlElement = "select";
          else
            console.error("Unknown multiplicity for parameter type link", taskParam);
          break;
        case "number":
          taskParam.htmlElement = "numberinput";
          break;
        case "longtext":
          taskParam.htmlElement = "textarea";
          break;
        default:
          taskParam.htmlElement = "hidden";
          console.error("Unknown parameter type", taskParam)
      }
    });
    // reset form values
    this.contentForm.reset();
    // initialize form with values from task
    // TODO implement content initialization
  }

  static validateArrayAtLeastOne(array: FormArray) {
    // NOT NULL CHECKS
    if (!array || array.length < 1)
      return {'error': true};
    const oneItemChecked = array.controls.some(control => control.value);
    return oneItemChecked ? null : {'error': true};
  }

}

