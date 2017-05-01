import { Component } from '@angular/core';
import {UserService } from '../../shared';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
  providers: [MdSnackBar]
})
export class OverviewComponent {

  public editSettings: boolean = false;
  public user = {};

  constructor(private userService: UserService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe( (data) => {
      this.user = data;
    });
  }

  updateUser() {
    this.userService.updateUserInfo(this.user).subscribe( (data) => {
      this.user = data;
      this.snackBar.open('Update successful.', 'OK');
    }, (error) => {
      this.snackBar.open('Error while updating. Try again.', 'OK');

    });
  }

}
