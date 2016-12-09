import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
  selector: 'task-suggestion',
  styleUrls: ['./taskSuggestion.component.css'],
  templateUrl: './taskSuggestion.component.html'
})

export class TaskSuggestionComponent {
  @Input() suggestedTask:any;

  constructor() {
  }

}
