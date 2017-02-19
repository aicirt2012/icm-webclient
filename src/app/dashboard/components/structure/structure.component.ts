import { Component } from '@angular/core';
import { DashboardService } from '../../shared';


@Component({
  selector: 'structure',
  templateUrl: 'structure.component.html',
  styleUrls: ['structure.component.css'],
  providers: []
})
export class StructureComponent {

  public converstations: any;
  public labels: any;

  constructor(private _ds: DashboardService) { }

  ngOnInit() {
    this._ds.getStructure().subscribe((s)=>{
      this.converstations = s.converstations;
      this.labels = s.labels;
    })
  }



}
