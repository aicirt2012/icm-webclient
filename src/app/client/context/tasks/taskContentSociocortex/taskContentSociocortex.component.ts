import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'task-content-sociocortex',
  styleUrls: ['./taskContentSociocortex.component.css'],
  templateUrl: './taskContentSociocortex.component.html'
})

export class TaskContentSociocortexComponent {

  @Input()
  private contentForm: FormGroup;
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

  private preProcessParameters() {
    this._taskParams.forEach(taskParam => {
      switch (taskParam.type) {
        case "enumeration":
          if (taskParam.multiplicity === 'exactlyOne')
            taskParam.htmlElement = "radioboxes";
          else if (taskParam.multiplicity === 'any')
            taskParam.htmlElement = "checkboxes";
          else
            console.error("Unknown multiplicity for parameter type enumeration", taskParam);
          break;
        case "string":
          if (taskParam.multiplicity === 'exactlyOne')
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
        default:
          console.error("Unknown parameter type", taskParam)
      }
    });
  }

}

