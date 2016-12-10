import { Component } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';

@Component({
  selector: 'top-navbar',
  templateUrl: 'topNavbar.component.html',
  styleUrls: ['topNavbar.component.css'],
})
export class TopNavbarComponent {
  public status:{isopen:boolean} = {isopen: false};
  public items:Array<string> = ['Acccount', 'Logout'];

  constructor() {  }

  ngOnInit() {}
  
  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
