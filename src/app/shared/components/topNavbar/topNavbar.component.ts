import { Component } from '@angular/core';

@Component({
  selector: 'top-navbar',
  templateUrl: 'topNavbar.component.html',
  styleUrls: ['topNavbar.component.css'],
})
export class TopNavbarComponent {
  constructor() {  }
  
  public showSettings: boolean = false;

  ngOnInit() {}
  
  showSettingsMenu() {
    this.showSettings = true;
  }
  
  hideSettingsMenu() {
    this.showSettings = false;
  }
}
