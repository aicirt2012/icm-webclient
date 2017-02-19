import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MdSnackBar, MdInput } from '@angular/material';
import { TaskService } from '../shared';
import { AppState } from '../../app.service';

@Component({
  selector: 'task-dialog',
  styleUrls: ['./TaskDialog.component.css'],
  templateUrl: './TaskDialog.component.html'
})
export class TaskDialogComponent {

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
  overdue: boolean = false;
  sticker_check: boolean = false;

  constructor(public taskDialogRef: MdDialogRef<TaskDialogComponent>, private snackBar: MdSnackBar, private _taskService: TaskService, public appState: AppState) {
  }

  ngOnInit() {
    if(this.task.taskType == 'linked') {
      this.sticker_check = this.task.stickers.find((sticker) => sticker.image === 'check') ? true : false;
      this.overdue = this.task.date ? (new Date(this.task.date) < new Date()) : false;
    }
  }

  createTask() {
    this.sending = true;
    this._taskService.createTask(this.email, this.task)
      .subscribe((task: any) => {
        this.sending = false;
        this.email.suggestedTasks.splice(this.task.index, 1);
        this.email.linkedTasks.push(this.addLinkedTask(task));
        this.snackBar.open('Task successfully created.', 'OK');
        this.closeDialog();
      },
      (error) => {
        console.log(error);
        this.sending = false;
        this.snackBar.open('Error while creating task.', 'OK');
      });
  }

  updateTask(close?: string) {
    this.sending = true;
    this.task.closed = false;
    if (close == 'close') {
      this.task.closed = true;
    }
    this._taskService.updateTask(this.task)
      .subscribe((task: any) => {
        this.sending = false;
        this.snackBar.open('Task successfully updated.', 'OK');
        this.updateLinkedTasks(this.task);
        /* we need to update here manually the linked tasks in appstate */
        this.closeDialog();
      },
      (error) => {
        console.log(error);
        this.sending = false;
        this.snackBar.open('Error while updating task.', 'OK');
      });
  }

  unlinkTask() {
    console.log(this.task);
    this.sending = true;
    this._taskService.unlinkTask(this.task)
      .subscribe((task: any) => {
        this.sending = false;
        this.removeFromLinkedTasks(this.task);
        this.snackBar.open('Task successfully unlinked.', 'OK');
        this.closeDialog();
      },
      (error) => {
        console.log(error);
        this.sending = false;
        this.snackBar.open('Error while unlinking task.', 'OK');
      });
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

  onSelectBoard(board: any) {
    this.task.possibleMembers = [].concat(board.members);
    this.task.selectedMembers = this.task.selectedMembers == undefined ? [] : this.task.selectedMembers;
  }

  addMember(member: any, index: number): void {
    this.task.selectedMembers.push(member);
    this.task.possibleMembers.splice(index, 1);
    this.currMember = '';
  }

  deleteMember(member: any, index: number) {
    this.task.possibleMembers = this.task.possibleMembers == undefined ? [] : this.task.possibleMembers;
    this.task.possibleMembers.push(member);
    this.task.selectedMembers.splice(index, 1);
    this.currMember = '';
  }

  addLinkedTask(task: any) {
    task['board'] = this.task.board;
    task['list'] = this.task.list;
    task['possibleMembers'] = this.task.possibleMembers;
    task['selectedMembers'] = this.task.selectedMembers;
    task['members'] = this.task.selectedMembers;
    task['taskType'] = 'linked';
    return task;
  }

  removeFromLinkedTasks(task: any) {
    this.email.linkedTasks.splice(this.email.linkedTasks.findIndex((t) => t.id == task.id), 1);
  }

  updateLinkedTasks(task: any) {
    if (task.closed == true) {
      this.removeFromLinkedTasks(task);
    }
    else {
      this.email.linkedTasks[this.email.linkedTasks.findIndex((t) => t.id == task.id)] = task;
    }
  }

}
