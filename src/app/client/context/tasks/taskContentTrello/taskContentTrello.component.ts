import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'task-content-trello',
  styleUrls: ['./taskContentTrello.component.css'],
  templateUrl: './taskContentTrello.component.html'
})

export class TaskContentTrelloComponent {

  @Input()
  private contentForm: FormGroup;

}

