import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'task-card',
    templateUrl: 'taskCard.component.html',
    styleUrls: ['taskCard.component.css']
})
export class TaskCardComponent {
    @Input() task: any;
    @Input() members: any[];
    assignedMembers: any[] = [];
    overdue: boolean = false;
    sticker_check: boolean = false;

    constructor() { }

    ngOnInit() {
        
        this.overdue = this.task.due ? (new Date(this.task.due) < new Date()) : false;

        this.sticker_check = this.task.stickers.find((sticker) => sticker.image === 'check') ? true : false;
    
        if(this.task.linkedEmail) {
             this.task.linkToEmail = `box/${this.task.linkedBox}/${this.task.linkedEmail}`;
        }
        let mappedMembers = this.members.map((m) => {return m.id});
        this.task.idMembers.forEach((memberId) => {
            let index = mappedMembers.indexOf(memberId);
            this.assignedMembers.push(this.members[index]);
        })

     }

}