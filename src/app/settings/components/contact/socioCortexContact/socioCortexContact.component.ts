import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'socioCortexContact',
  templateUrl: 'socioCortexContact.component.html',
  styleUrls: ['socioCortexContact.component.css'],
})
export class SocioCortexContactComponent {

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
