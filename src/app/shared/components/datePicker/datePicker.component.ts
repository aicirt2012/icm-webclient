import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'datepicker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.css']
})
export class DatePickerComponent {

  @Input()
  private autocompleteDates: Date[];
  private stringValue: FormControl = new FormControl('');
  private dateValue: FormControl = new FormControl(null);
  private autocomplete = {
    all: [],
    filtered: []
  };

  constructor() {
  }

  ngOnInit() {
    // TODO init the views from the values we got
    console.log("init date picker component. stringValue, dateValue, autocomplete", this.stringValue.value, this.dateValue.value, this.autocomplete);

    this.autocomplete.all = this.autocompleteDates.map(date => new MyDate(date).toString());
    this.autocomplete.filtered = this.autocomplete.all;
    this.stringValue.valueChanges
      .subscribe(updatedValue => {
        this.autocomplete.filtered = this.autocomplete.all.filter(date => date.indexOf(updatedValue) == 0);
      });
    this.dateValue.valueChanges
      .subscribe(() => this.stringValue.setValue(new MyDate(this.dateValue.value).toString()));
  }

  onStringInputBlur() {
    this.dateValue.setValue(new Date(this.stringValue.value));
  }

}

class MyDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  toString(): string {
    if (!this.value)
      return "";
    let d = new Date(this.value),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
