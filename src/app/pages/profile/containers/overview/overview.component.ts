import { Component } from '@angular/core';

@Component({
  selector: 'overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
})
export class OverviewComponent {

  public editSettings: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
