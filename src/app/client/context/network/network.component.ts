import { Component, Input} from '@angular/core';
import { NetworkService } from '../../shared/network.service'

@Component({
  selector: 'network',
  styleUrls: ['./network.component.css'],
  templateUrl: './network.component.html'
})

export class NetworkComponent{

  private contacts: any;
  private query: string = 'Max Mustermann';
  private loading: boolean = false;

  constructor(private nt: NetworkService) {
  }

  public ngOnInit() {
    this.nt.list().subscribe((contacts)=>{
      this.contacts = contacts;
      this.loading = false;
    });
  }

  public search(){
    this.loading = true;
    this.nt.search(this.query).subscribe((contacts)=>{
      this.contacts = contacts;
      this.loading = false;
    });
  }

}
