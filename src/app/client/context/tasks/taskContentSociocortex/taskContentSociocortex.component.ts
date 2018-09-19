import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { HtmlElements } from './index';

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
    this.processNewTaskParameters();
    console.log("Processed parameters.", this._taskParams, this.contentForm);
  }

  constructor(private fb: FormBuilder) {
  }

  private processNewTaskParameters() {
    this.clearFormControls();
    this.initializeFormControls();
    this.contentForm.reset();
    this.initializeFormValues();
  }

  private clearFormControls() {
    while (this.contentForm.length > 0) {
      this.contentForm.removeAt(0);
    }
  }

  private initializeFormControls() {
    this._taskParams.forEach(taskParam => {
      if (taskParam.required)
        this.contentForm.push(this.fb.control('', Validators.required));
      else
        this.contentForm.push(this.fb.control(''));
      // advanced param detection
      switch (taskParam.uiReference) {
        case "svg":
          taskParam.htmlElement = HtmlElements.VectorGraphics;
          return;
        case "privatelink":
          taskParam.htmlElement = HtmlElements.URL;
          return;
        case null:
        case undefined:
          // do nothing and continue to simple param detection
          break;
        default:
          taskParam.htmlElement = HtmlElements.Unsupported;
          this.contentForm.setControl(this.contentForm.length - 1, this.fb.control(''));  // drop required attribute
          console.error("Unknown parameter uiReference", taskParam);
          return;
      }
      // simple param detection
      switch (taskParam.type) {
        case "enumeration":
          this.initEnumParam(taskParam);
          break;
        case "string":
          this.initStringParam(taskParam);
          break;
        case "date":
          this.initDateParam(taskParam);
          break;
        case "link":
          this.initLinkParam(taskParam);
          break;
        case "number":
          taskParam.htmlElement = HtmlElements.Number;
          break;
        case "longtext":
          taskParam.htmlElement = HtmlElements.TextArea;
          break;
        default:
          taskParam.htmlElement = HtmlElements.Unsupported;
          this.contentForm.setControl(this.contentForm.length - 1, this.fb.control(''));  // drop required attribute
          console.error("Unknown parameter type", taskParam);
      }
    });
  }

  private initEnumParam(taskParam) {
    if (taskParam.multiplicity === 'exactlyOne')
      taskParam.htmlElement = HtmlElements.RadioBoxes;
    else if (taskParam.multiplicity === 'atLeastOne') {
      taskParam.htmlElement = HtmlElements.CheckBoxes;
      const checkboxControls = [];
      taskParam.constraints.enumerationOptions.forEach(() =>
        checkboxControls.push(this.fb.control(['']))
      );
      const array = this.fb.array(checkboxControls, TaskContentSociocortexComponent.validateArrayAtLeastOne);
      this.contentForm.setControl(this.contentForm.length - 1, array);
    } else if (taskParam.multiplicity === 'any') {
      taskParam.htmlElement = HtmlElements.CheckBoxes;
      this.contentForm.removeAt(this.contentForm.length - 1);
      const array = this.fb.array(['']);
      taskParam.constraints.enumerationOptions.forEach(() => array.push(this.fb.control([])));
      this.contentForm.push(array);
    } else
      console.error("Unknown multiplicity for parameter type enumeration", taskParam);
  }

  // noinspection JSMethodCanBeStatic
  private initStringParam(taskParam) {
    if (taskParam.multiplicity === 'exactlyOne')
      taskParam.htmlElement = HtmlElements.TextInput;
    else if (!taskParam.multiplicity)
      taskParam.htmlElement = HtmlElements.TextInput;
    else
      console.error("Unknown multiplicity for parameter type string", taskParam);
  }

  // noinspection JSMethodCanBeStatic
  private initDateParam(taskParam) {
    this.contentForm.at(this.contentForm.length - 1).setValue(null);
    if (taskParam.multiplicity === 'exactlyOne')
      taskParam.htmlElement = HtmlElements.DatePicker;
    else
      console.error("Unknown multiplicity for parameter type date", taskParam);
  }

  // noinspection JSMethodCanBeStatic
  private initLinkParam(taskParam) {
    if (taskParam.multiplicity === 'exactlyOne')
      taskParam.htmlElement = HtmlElements.Select;
    else
      console.error("Unknown multiplicity for parameter type link", taskParam);
  }

  private initializeFormValues() {
    let i = 0;
    this._taskParams.forEach(taskParam => {
      switch (<HtmlElements> taskParam.htmlElement) {
        case HtmlElements.Number:
        case HtmlElements.TextInput:
        case HtmlElements.TextArea:
          if (taskParam.values && taskParam.values.length > 0)
            this.contentForm.at(i).setValue(taskParam.values[0]);
          else if (taskParam.defaultValues && taskParam.defaultValues.length > 0)
            this.contentForm.at(i).setValue(taskParam.defaultValues[0]);
          break;
        case HtmlElements.Select:
        case HtmlElements.RadioBoxes:
          if (taskParam.values && taskParam.values.length > 0)
            this.contentForm.at(i).setValue(taskParam.values[0]);
          else if (taskParam.defaultValues && taskParam.defaultValues.length > 0)
            this.contentForm.at(i).setValue(taskParam.defaultValues[0]);
          break;
        case HtmlElements.DatePicker:
          if (taskParam.values && taskParam.values.length > 0)
            this.contentForm.at(i).setValue(new Date(taskParam.values[0]));
          else if (taskParam.defaultValues && taskParam.defaultValues.length > 0)
            this.contentForm.at(i).setValue(new Date(taskParam.defaultValues[0]));
          break;
        case HtmlElements.CheckBoxes:
          if (taskParam.values && taskParam.values.length > 0) {
            taskParam.values.forEach(value => {
              let j = 0;
              taskParam.constraints.enumerationOptions.some(enumOption => {
                if (value === enumOption.value) {
                  (<FormArray> this.contentForm.at(i)).at(j).setValue(value);
                  return true;
                }
                j++;
              })
            });
          } else if (taskParam.defaultValues && taskParam.defaultValues.length > 0)
            this.contentForm.at(i).setValue(taskParam.defaultValues[0]);
          break;
      }
      i++;
    });
  }

  static validateArrayAtLeastOne(array: FormArray) {
    if (!array || array.length < 1)
      return {'error': true};
    const oneItemChecked = array.controls.some(control => control.value);
    return oneItemChecked ? null : {'error': true};
  }

}

