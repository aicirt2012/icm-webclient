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

  private scConfig = {
    email: '',
    password: '',
    baseURL: ''
  };

  constructor(private userService: UserService, private snackBar:  MdSnackBar) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data) => {
      console.log(data)
      if(data.sociocortex) {
        this.scConfig = data.sociocortex;
      }
    })
  }

  updateUserWithScConfig() {
    this.userService.updateScConfig(this.scConfig)
      .subscribe((data: any) => {
        this.scConfig = data.sociocortex;
        this.snackBar.open('Update successful.', 'OK');
      }, (error) => {
        this.snackBar.open('Error while updating. Try again.', 'OK');

      });
  }

}
