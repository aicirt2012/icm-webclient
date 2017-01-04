import { Component, Input } from '@angular/core';
import { SnackbarService } from '../../services';

@Component({
  selector: 'snackbar',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['snackbar.component.css']
})
export class SnackbarComponent {
  constructor(public snackbar: SnackbarService) {
  }
}
