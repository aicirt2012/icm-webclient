import { Component } from '@angular/core';

@Component({
  selector: 'socioCortex',
  templateUrl: 'socioCortex.component.html',
  styleUrls: ['socioCortex.component.css'],
})
export class SocioCortexComponent {

  public mailValid: boolean = false;
  public scConfig = {};

  constructor() {

  }

  ngOnInit() {
  }

}
