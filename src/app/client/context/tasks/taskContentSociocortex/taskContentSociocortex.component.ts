import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material';
import { ICM_DATE_FORMATS } from '../taskDialog';

@Component({
  selector: 'task-content-sociocortex',
  styleUrls: ['./taskContentSociocortex.component.css'],
  templateUrl: './taskContentSociocortex.component.html',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: ICM_DATE_FORMATS},
  ]
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
    console.log("Preprocessed parameters.", this._taskParams);
  }

  constructor(private formBuilder: FormBuilder) {
  }

  private preProcessParameters() {
    this._taskParams.forEach(taskParam => {
      if (taskParam.required)
        this.contentForm.push(this.formBuilder.control(['', Validators.required]));
      else
        this.contentForm.push(this.formBuilder.control(['']));
      switch (taskParam.type) {
        case "enumeration":
          if (taskParam.multiplicity === 'exactlyOne')
            taskParam.htmlElement = "radioboxes";
          else if (taskParam.multiplicity === 'atLeastOne')
            taskParam.htmlElement = "checkboxes";
          else if (taskParam.multiplicity === 'any')
            taskParam.htmlElement = "checkboxes";
          else
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
  }

}

