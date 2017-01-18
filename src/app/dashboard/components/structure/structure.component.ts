import { Component } from '@angular/core';
import { DashboardService } from '../../shared';


@Component({
  selector: 'structure',
  templateUrl: 'structure.component.html',
  styleUrls: ['structure.component.css'],
  providers: []
})
export class StructureComponent {

  public structure: any = {};

  constructor(private _ds: DashboardService) { }

  ngOnInit() {
    this._ds.getStructure().subscribe((s)=>{
      console.log(s);
      this.structure = s;
    })
  }



}
