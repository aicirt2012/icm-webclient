import { Component, Input } from '@angular/core';
import { TaskService } from '../../../shared';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'socioCortex',
  templateUrl: 'socioCortex.component.html',
  styleUrls: ['socioCortex.component.css'],
})
export class SocioCortexComponent {

  @Input() scConfig: any;

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  updateConfig() {
    this.taskService.configureSociocortex(this.scConfig.email, this.scConfig.password).subscribe(() => {
      this.taskService.setupSociocortex().subscribe(() => {
        this.snackBar.open("Connecare connection successful.", 'OK');
      }, (() => {
        this.snackBar.open('Error while connecting to Connecare with given credentials. Please check email/password and try again.', 'OK');
      }));
    }, () => {
      this.snackBar.open('Error while updating Connecare configuration. Please try again.', 'OK');
    });
  }

}
