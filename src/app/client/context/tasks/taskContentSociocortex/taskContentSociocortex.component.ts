import { Component, ElementRef, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { HtmlElements } from './index';
import { Chart } from 'chart.js';

@Component({
  selector: 'task-content-sociocortex',
  styleUrls: ['./taskContentSociocortex.component.css'],
  templateUrl: './taskContentSociocortex.component.html'
})

export class TaskContentSociocortexComponent {

  @Input()
  private contentForm: FormArray;
  private _taskParams: any[];

  @Input()
  private readOnly: boolean = false;

  get taskParams(): any[] {
    return this._taskParams;
  }

  @Input()
  set taskParams(taskParams: any[]) {
    this._taskParams = taskParams;
    this.processNewTaskParameters();
    console.log("Processed parameters.", this._taskParams, this.contentForm);
  }

  constructor(private fb: FormBuilder, private elementRef: ElementRef) {
  }

  // noinspection JSUnusedGlobalSymbols (called by angular)
  ngAfterViewInit() {
    this.taskParams.forEach(taskParam => {
      if (taskParam.uiReference === "linediagram")
        this.initLineDiagramView(taskParam);
    });
  }

  private initLineDiagramView(taskParam) {
    let colors = ["#20c9a1", "#00aaad", "#008aa4", "#386988", "#444c62", "#3b4f92", "#404dbe", "#6141e3", "#9600ff"];
    taskParam.charts = taskParam.chartIds.map((chartId, index) =>
      new Chart(this.elementRef.nativeElement.querySelector('#' + taskParam.chartIds[index]).getContext("2d"), {
        type: 'line',
        data: {
          labels: taskParam.chartLabels[index].map(date => TaskContentSociocortexComponent.formatDate(date)),
          datasets: [{
            data: taskParam.chartDatasets[index],
            borderColor: index < colors.length ? colors[index] : "#2f3649",
            backgroundColor: index < colors.length ? colors[index] : "#2f3649",
            fill: false
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {display: false},
          scales: {
            xAxes: [{display: true, time: {round: "minute"}}],
            yAxes: [{display: true, ticks: {beginAtZero: true}}]
          },
          elements: {line: {tension: 0}}
        }
      }));
  }

  private static formatDate(date: Date): string {
    if (!date)
      return "";
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hours = d.getHours(),
      minutes = d.getMinutes();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-') + " " + hours + ":" + minutes;
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
      if (!this.detectUiReference(taskParam))
        this.detectParamType(taskParam);
      taskParam.readOnly = this.readOnly ? true : taskParam.readOnly;
    });
  }

  private detectUiReference(taskParam) {
    // advanced param detection
    if (taskParam.uiReference && taskParam.uiReference.startsWith("conditonalmultiplicity") && taskParam.type == "number")
    // treat dynamic number inputs as static ones
      return false;
    switch (taskParam.uiReference) {
      case "svg":
        taskParam.htmlElement = HtmlElements.VectorGraphics;
        return true;
      case "privatelink":
        taskParam.htmlElement = HtmlElements.URL;
        return true;
      case "linediagram":
        this.initLineDiagramParam(taskParam);
        return true;
      case null:
      case undefined:
        // do nothing and continue to simple param detection
        return false;
      default:
        taskParam.htmlElement = HtmlElements.Unsupported;
        this.contentForm.setControl(this.contentForm.length - 1, this.fb.control(''));  // drop required attribute
        console.error("Unknown parameter uiReference", taskParam);
        return true;
    }
  }

  private detectParamType(taskParam) {
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
  }

  private initLineDiagramParam(taskParam) {
    taskParam.htmlElement = HtmlElements.LineDiagram;
    taskParam.chartCaptions = [];
    taskParam.chartLabels = [];
    taskParam.chartDatasets = [];
    taskParam.chartIds = [];
    if (taskParam.values && taskParam.values.length > 0) {
      taskParam.chartCaptions = Object.keys(taskParam.values[0]);
      taskParam.chartCaptions.forEach((chartCaption, index) => {
        taskParam.chartIds.push("chart_" + index + "_" + taskParam.id);
        const rawChart = taskParam.values[0][chartCaption];
        taskParam.chartLabels.push(rawChart.map(dataPoint => new Date(dataPoint.date)));
        taskParam.chartDatasets.push(rawChart.map(dataPoint => dataPoint.value));
      });
      taskParam.chartCaptions = taskParam.chartCaptions.map(caption => {
        return caption.charAt(0).toUpperCase() + caption.split(/(?=[A-Z])/).join(' ').substr(1);
      });
    }
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

  // noinspection JSUnusedLocalSymbols // called from html
  private resolveEnumOptions(options: string[], taskParam: any): string {
    let result = "";
    options.forEach(option => {
      if (option)
        result += this.resolveEnumOption(option, taskParam) + ", ";
    });
    return result.length > 0 ? result.substring(0, result.length - 2) : result;
  }

  private resolveEnumOption(option: string, taskParam: any): string {
    let result = "";
    taskParam.constraints.enumerationOptions.some(enumOption => {
      if (enumOption.value === option) {
        result = enumOption.description;
        return true;
      }
      return false;
    });
    return result;
  }

  static validateArrayAtLeastOne(array: FormArray) {
    if (!array || array.length < 1)
      return {'error': true};
    const oneItemChecked = array.controls.some(control => control.value);
    return oneItemChecked ? null : {'error': true};
  }

}

