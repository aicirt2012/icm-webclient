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
  overdue: boolean = false;
  sticker_check: boolean = false;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.overdue = this.task.due ? (new Date(this.task.due) < new Date()) : false;
    this.sticker_check = this.task.stickers.find((sticker) => sticker.image === 'check') ? true : false;
  }

   getNames(members: any[]) {
    return members.map((member) => { return member.fullName}).join();
  }

  open(task: any) {
    this.router.navigate(["/"]).then(result=>{window.open(task.shortUrl)});
  }


}
