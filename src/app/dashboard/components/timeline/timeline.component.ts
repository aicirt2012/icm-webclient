import { Component } from '@angular/core';
import { DashboardService } from '../../shared';


@Component({
  selector: 'timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css'],
  providers: []
})
export class TimelineComponent {

  public timeline: any = {};

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    this._dashboardService.getTimeline().subscribe((timeline)=>{
      console.log(timeline);
      this.timeline = timeline;
    })
  }



}
