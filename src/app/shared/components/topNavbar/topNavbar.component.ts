import { Component } from '@angular/core';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'top-navbar',
  templateUrl: 'topNavbar.component.html',
  styleUrls: ['topNavbar.component.css'],
})
export class TopNavbarComponent {
  public items: any[] = [
    { name: 'Settings', route: '/settings/overview', icon: 'account_circle' }, 
    { name: 'Task Overview', route: '/task-overview', icon: 'format_list_numbered' },
    { name: 'Dashboard', route: '/dashboard/timeline', icon: 'dashboard' },
    { name: 'Logout', route: '/login', icon: 'exit_to_app' }
    ];

  constructor() { }

  ngOnInit() { }
}
