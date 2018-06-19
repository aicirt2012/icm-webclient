import { Component, Input } from '@angular/core';
import { AppState } from '../../../app.service';

@Component({
  selector: 'tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  suggestedTasks: any[] = [];

  private user: any;

  constructor(public appState: AppState) {
  }

  ngOnInit() {
    this.appState.user().subscribe(user => {
      this.user = user;
    });
    // TODO initialize suggested tasks from email.suggestedData
  }

  isAnyProviderEnabled(): boolean {
    if (this.user && this.user.taskProviders)
      Object.keys(this.user.taskProviders).forEach((provider) => {
        if (this.user.taskProviders[provider].isEnabled)
          return true;
      });
    return false;
  }

}
