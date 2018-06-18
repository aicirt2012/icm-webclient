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
  suggestedTasks = [];

  private user: any;

  constructor(public appState: AppState) {
  }

  ngOnInit() {
    this.appState.user().subscribe(user => {
      this.user = user;
      this.anyProviderEnabled = false;
      user.taskProviders.forEach((providerConfig) => {
        this.anyProviderEnabled = this.anyProviderEnabled || providerConfig.isEnabled;
      });
      // TODO initialize suggested tasks from email.suggestedData
    });
  }

}
