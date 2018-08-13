import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'task-content-sociocortex',
  styleUrls: ['./taskContentSociocortex.component.css'],
  templateUrl: './taskContentSociocortex.component.html'
})

export class TaskContentSociocortexComponent {

  @Input()
  private contentForm: FormGroup;

}

