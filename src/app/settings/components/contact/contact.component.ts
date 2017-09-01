import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css'],
  providers: [MdSnackBar]
})
export class ContactComponent {

  private socioCortex = {
    isEnabled: false,
    email: '',
    password: '',
    baseURL: ''
  };

  constructor(private userService: UserService, private snackBar: MdSnackBar) {}

  public ngOnInit() {
    this.userService.getUserInfo().subscribe((user) => {
      this.socioCortex = user.contactProvider.socioCortex;
    });
  }

  public updateSocioCortex() {
    console.log('her',this.socioCortex);
    this.userService.updateContactProviderSocioCortex(this.socioCortex)
      .subscribe((data: any) => {
        this.socioCortex = data.contactProvider.socioCortex;
        this.snackBar.open('Update successful.', 'OK');
      }, (error) => {
        this.snackBar.open('Error while updating. Try again.', 'OK');

      });
  }

}
