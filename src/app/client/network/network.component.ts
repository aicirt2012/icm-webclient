import { Component, Input} from '@angular/core';
import { WikiService } from '../shared/wiki.service'

@Component({
  selector: 'network',
  styleUrls: ['./network.component.css'],
  templateUrl: './network.component.html'
})

export class NetworkComponent{
 
  private content: any;
  private query: string = 'Munich';
  private loading: boolean = false;

  constructor(private ws: WikiService) {
  }

  ngOnInit() {
  }

  search(){
    this.loading = true;
  }




}
