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
        this.snackBar.open("SACM connection successful.", 'OK');
      }, (() => {
        this.snackBar.open('Error while connecting to SACM with given credentials. Please check email/password and try again.', 'OK');
      }));
    }, () => {
      this.snackBar.open('Error while updating SACM config. Please try again.', 'OK');
    });
  }

}
