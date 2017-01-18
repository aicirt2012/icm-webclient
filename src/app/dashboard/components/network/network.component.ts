import { Component } from '@angular/core';
import { DashboardService } from '../../shared';


@Component({
  selector: 'network',
  templateUrl: 'network.component.html',
  styleUrls: ['network.component.css'],
  providers: []
})
export class NetworkComponent {


  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {

  }


}
