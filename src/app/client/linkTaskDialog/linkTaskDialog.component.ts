import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MdSnackBar, MdInput } from '@angular/material';
import { TaskService } from '../shared';
import { AppState } from '../../app.service';

@Component({
  selector: 'link-task-dialog',
  styleUrls: ['./LinkTaskDialog.component.css'],
  templateUrl: './LinkTaskDialog.component.html'
})
export class LinkTaskDialogComponent {

  public task: any = {};
  public suggestedTasks: any = [];
  public linkedTasks: any = [];
  public email: any = {};
  public boards: any[] = [];
  public sending: boolean = false;
  public selectedMembers: any[] = [];
  public possibleMembers: any[] = [];
  public currMember = '';
  public index = '';
  public members = [];
  public date: any;

  constructor(public linkTaskDialogRef: MdDialogRef<LinkTaskDialogComponent>, private snackBar: MdSnackBar, private _taskService: TaskService, public appState: AppState) {
  }

  linkTask() {
    this.sending = true;
    this._taskService.linkTask(this.email, this.task)
      .subscribe((task: any) => {
        this.email.linkedTasks.push(this.addLinkedTask(this.task));
        this.sending = false;
        this.snackBar.open('Task successfully linked.', 'OK');
        this.closeDialog();
      },
      error => {
        console.log(error);
        this.sending = false;
        this.snackBar.open('Error while linking task.', 'OK');
      },
      () => { });
  }

  closeDialog() {
    this.linkTaskDialogRef.close();
  }

  onSelectBoard(board: any) {
    this.task.possibleMembers = [].concat(board.members);
    this.task.selectedMembers = this.task.selectedMembers == undefined ? [] : this.task.selectedMembers;
  }

  onSelectCard(card: any) {
    this.members = this.task.board.members.length > 0 ? this.task.board.members.filter((member) => { if (card.idMembers.indexOf(member.id) > -1) return member }) : [];
    this.date = this._taskService.formatDate(card.due);
  }

  addLinkedTask(task: any) {
    /* this has to be done because of javascript circular reference error */
    let newTask = task.card;
    newTask['taskType'] = 'linked';
    newTask['board'] = {'id' : task.board.id, 'lists': task.board.lists, 'name': task.board.name};
    newTask['possibleMembers'] = task.possibleMembers;
    let members = task.board.members.length > 0 ? task.board.members.filter((member) => { if (task.card.idMembers.indexOf(member.id) > -1) return member }) : [];
    newTask['selectedMembers'] = members;
    newTask['members'] = members;
    newTask['list'] = task.board ? task.board.lists.filter((list) => { if(list.id == task.card.idList) return list })[0] : {};
    return newTask;
  }

}
