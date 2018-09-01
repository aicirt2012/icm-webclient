import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'datepicker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.css']
})
export class DatePickerComponent {

  @Input()
  private autocompleteStrings: string[];
  private stringValue: FormControl = this.fb.control(['']);
  private autocomplete = {
    all: [],
    filtered: []
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // TODO init the views from the values we got
    console.log("init date picker component. value, autocompleteValues", this.stringValue, this.autocomplete);

    this.autocomplete.all = ["2019-08-07", "2018-07-06", "2017-06-05", "2010-12-11"]; // TODO remove this line after debugging
    this.autocomplete.filtered = this.autocomplete.all;
    this.stringValue.valueChanges
      .subscribe(updatedValue => {
        this.autocomplete.filtered = this.autocomplete.all.filter(date => date.indexOf(updatedValue) == 0)
        console.log("Input changed! value, displayedValue", this.stringValue, this.autocomplete);
      });
  }

  onPickerChange(event: any) {
    console.log("Picker changed! event, value, displayedValue", event, this.stringValue, this.autocomplete);
  }

}

class MyDate {
  value: Date;

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
