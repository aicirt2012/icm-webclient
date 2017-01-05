import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'socioCortex',
  templateUrl: 'socioCortex.component.html',
  styleUrls: ['socioCortex.component.css'],
})
export class SocioCortexComponent {

  @Input() scConfig: any;
  @Output() updateUserWithScConfig = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  updateUser() {
    this.updateUserWithScConfig.emit();
  }

}
