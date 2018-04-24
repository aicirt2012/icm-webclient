import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css'],
  providers: [MatSnackBar]
})
export class ContactComponent {

  private socioCortex = {
    isEnabled: false,
    email: '',
    password: '',
    baseURL: ''
  };

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  public ngOnInit() {
    this.userService.getUserInfo().subscribe((user) => {
      this.socioCortex = user.contactProvider.socioCortex;
    });
  }

  public updateSocioCortex() {
    console.log('her',this.socioCortex);
    this.userService.updateContactProviderSocioCortex(this.socioCortex)
      .subscribe((data: any) => {
        this.snackBar.open('Update successful.', 'OK');
        this.socioCortex = data.contactProvider.socioCortex;
      }, (error) => {
        this.snackBar.open('Error while updating. Try again.', 'OK');

      });
  }

}
