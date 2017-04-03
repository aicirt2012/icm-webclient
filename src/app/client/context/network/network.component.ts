import { Component, Input} from '@angular/core';
import { NetworkService } from '../../shared/network.service'

@Component({
  selector: 'network',
  styleUrls: ['./network.component.css'],
  templateUrl: './network.component.html'
})

export class NetworkComponent{
 
  private content: any;
  private query: string = 'Max Mustermann';
  private loading: boolean = false;

  constructor(private nt: NetworkService) {
  }

  ngOnInit() {
  }

  search(){
    this.loading = true;
  }




}
