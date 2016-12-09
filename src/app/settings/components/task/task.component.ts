import { Component } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css'],
})
export class TaskComponent {

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
