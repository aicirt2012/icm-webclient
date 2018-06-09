import { Component, Input } from '@angular/core';
import { AppState } from '../../../app.service';

@Component({
  selector: 'tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  anyProviderEnabled = false;

  private user: any;
  private linkedTasks: any = [];

  constructor(public appState: AppState) {
  }

  ngOnInit() {
    this.appState.user().subscribe(user => {
      this.user = user;
      this.anyProviderEnabled = user.taskProviders.trello.isEnabled || user.taskProviders.sociocortex.isEnabled;
    });
  }

}
