import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
  selector: 'task-list',
  styleUrls: ['./taskList.component.css'],
  templateUrl: './taskList.component.html'
})

export class TaskListComponent {
  @Input() tasksForMail: any;
  @Input() suggestedTask:any;
  @Input() currentTab:string;
  @Output() createTask = new EventEmitter<any>();
  @Output() openTaskModal = new EventEmitter<any>();
  public dueDate : Date;
  private opened:boolean = false;

  constructor() {
    this.dueDate = new Date();
  }

  ngOnInit() {
  }

  public openDatePicker():void {
     this.opened = !this.opened;
   }

   public clearDatePicker():void {
     this.dueDate = void 0;
   }

   public closeDatePicker():void {
     this.opened = false;
   }

   public createSuggestedTask(suggestedTask:any) {
     console.log(suggestedTask);
     this.suggestedTask['dueDate'] = this.dueDate;
     this.createTask.emit(suggestedTask);
   }

   public showTaskModal() {
     console.log("emit now");
     this.openTaskModal.emit();
   }

}
