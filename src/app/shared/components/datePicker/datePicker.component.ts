import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'datepicker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.css']
})
export class DatePickerComponent {

  @Input() private readonly: boolean;

  @Input() private dateControl: FormControl;
  private stringControl: FormControl = new FormControl('');

  // noinspection JSMismatchedCollectionQueryUpdate
  @Input() private autocompleteDates: Date[];
  private autocomplete = {
    all: [],
    filtered: []
  };

  constructor() {
  }

  ngOnInit() {
    this.initData();
    this.initChangeListeners();
  }

  private initData() {
    this.autocomplete.all = this.autocompleteDates.map(date => DatePickerComponent.dateToString(date));
    this.autocomplete.filtered = this.autocomplete.all;
    this.stringControl.setValue(DatePickerComponent.dateToString(this.dateControl.value));
    this.onStringValueUpdate();
  }

  private initChangeListeners() {
    this.stringControl.valueChanges
      .subscribe(updatedValue => {
        this.autocomplete.filtered = this.autocomplete.all.filter(date => date.indexOf(updatedValue) == 0);
      });
    this.dateControl.valueChanges
      .subscribe(() => this.stringControl.setValue(DatePickerComponent.dateToString(this.dateControl.value)));
  }

  onStringValueUpdate() {
    const date = new Date(this.stringControl.value);
    // check if value is valid date
    if (date.getTime() > 0) {
      this.dateControl.setValue(date);
    } else {
      this.stringControl.setValue("");  // TODO improve error handling by keeping the input and showing a validation error
      this.dateControl.setValue(null);
    }
  }

  private static dateToString(date: Date): string {
    if (!date)
      return "";
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

}
