import { Component } from '@angular/core';

@Component({
  selector: 'tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css'],
})
export class TasksComponent {

  public currentView: string = 'Trello';

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
