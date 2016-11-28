import { Component } from '@angular/core';

@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
})
export class AccountComponent {

public currentView: string = 'Gmail';

  constructor() {

  }

  ngOnInit() {
  }

  showView(view: string): void{
      this.currentView = view;
      console.log("changed view to " + view);
  }

  getCurrentView(view: string) : boolean{
    console.log("get current view method");
      if(this.currentView == view)
           return true;
      else
           return false;
  }

  getActive(choice: string) : string{
      if(this.currentView == choice)
           return "active";
      else
           return "";
  }

}
