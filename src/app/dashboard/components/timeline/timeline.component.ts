import { Component } from '@angular/core';
import { DashboardService } from '../../shared';
let Punchcard = require('../../../../../node_modules/d3-punchcard/dist/d3-punchcard.min.js');
import * as CalendarHeatmap from '../../../../../node_modules/calendar-heatmap/src/calendar-heatmap.js'

@Component({
  selector: 'timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.css', '../../../../../node_modules/calendar-heatmap/src/calendar-heatmap.css'],
  providers: []
})
export class TimelineComponent {


  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    this._dashboardService.getTimeline().subscribe((timeline)=>{
      this.renderMonthlyPunchcard(timeline.monthly);
      this.renderDailyPunchcard(timeline.daily);
    });
  }

  renderMonthlyPunchcard(data) {

    /* considering only the last year */
    const chartData = [];
    data.forEach((day)=>{
      chartData.push({
        date: new Date(2017, day.month-1, day.day),
        count: day.count
      });
    });

    const from = new Date(2017,0,1);
    const to = new Date(2017,11,31);
    CalendarHeatmap(from, to)
      .data(chartData)
      .selector('#monthlypunchcard')
      .tooltipEnabled(true)
      .tooltipUnit('Email')
      .tooltipDatefromat('MMM Do')
      .colorRange(['#eee', '#1e6823'])();
  }


  renderDailyPunchcard(data) {
    /* [[Day, Hour, weight]] */
    const arr = [];
    data.forEach((pc) => {
      arr.push([pc.day, pc.hour, pc.count]);
    });
    new Punchcard({target: '#dailypunchcard', width: 900}).render(arr);
  }



}
