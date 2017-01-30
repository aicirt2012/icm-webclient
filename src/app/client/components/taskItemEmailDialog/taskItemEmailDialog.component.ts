import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'task-item-email-dialog',
  styleUrls: ['./taskItemEmailDialog.component.css'],
  templateUrl: './taskItemEmailDialog.component.html'
})
export class TaskItemEmailDialogComponent {
  @Input() task: any;
  @Output() removeTask: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

   getNames(members: any[]) {
    return members.map((member) => { return member.fullName}).join();
  }

  open(task: any) {
    this.router.navigate(["/"]).then(result=>{window.open(task.shortUrl)});
  }

  removeFromLinkedTasks(task: any) {
    this.removeTask.emit(task);
  }

}
