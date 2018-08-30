import { Component, Input } from '@angular/core';

@Component({
  selector: 'datepicker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.css']
})
export class DatePickerComponent {

  @Input()
  private value: Date;
  @Input()
  private suggestedValues: Date[];
  private displayedValue: MyDate;
  private displayedSuggestions: MyDate[];

  constructor() {
  }

  ngOnInit() {
    // TODO init the views from the values we got
  }

  onInputChange(event: any) {
    console.log("Input changed!", event);
  }

  onPickerChange(event: any) {
    console.log("Picker changed!", event);
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
