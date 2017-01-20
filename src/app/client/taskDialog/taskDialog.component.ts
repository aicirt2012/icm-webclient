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
  public suggestedTasks$: any = [];
  public linkedTasks$: any = [];
  public email: any = {};
  public boards: any[] = [];
  public sending: boolean = false;
  public selectedMembers: any[] = [];
  public possibleMembers: any[] = [];
  public currMember = '';
  public index = '';

  constructor(public taskDialogRef: MdDialogRef<TaskDialogComponent>, private snackBar: MdSnackBar, private _taskService: TaskService, public appState: AppState) {
  }

  ngOnInit() {
      this.suggestedTasks = this.appState.get('suggestedTasks');
      this.linkedTasks = this.appState.get('linkedTasks');
  }

  createTask() {
    this.sending = true;
    this._taskService.createTask(this.email, this.task)
      .subscribe((task: any) => {
        this.sending = false;
        this.appState.set('suggestedTasks', this.removeSuggestedTask(this.task.index));
        this.appState.set('linkedTasks', this.addLinkedTask(task));
        this.snackBar.open('Task successfully created.', 'OK');
        this.closeDialog();
      },
      error => {
        console.log(error);
        this.sending=false;
        this.snackBar.open('Error while creating task.', 'OK');
      },
      () => {});
  }

  updateTask() {
    this.sending = true;
    this._taskService.updateTask(this.task)
      .subscribe((task: any) => {
        this.sending=false;
        this.snackBar.open('Task successfully updated.', 'OK');
      },
      error => {
        console.log(error);
        this.sending=false;
        this.snackBar.open('Error while updating task.', 'OK');
      },
      () => {});
  }

  closeDialog() {
    this.taskDialogRef.close();
  }

  onSelectBoard(board:any) {
    this.task.possibleMembers = [].concat(board.members);
    this.task.selectedMembers = this.task.selectedMembers == undefined ? [] : this.task.selectedMembers;
  }

  addMember(member: any, index: number): void {
    this.task.selectedMembers.push(member);
    this.task.possibleMembers.splice(index,1);
    this.currMember = '';
  }

  deleteMember(member: any, index: number) {
    this.task.possibleMembers = this.task.possibleMembers == undefined ? [] : this.task.possibleMembers;
    this.task.possibleMembers.push(member);
    this.task.selectedMembers.splice(index,1);
    this.currMember = '';
  }

  addLinkedTask(task: any) {
    task['taskType'] = "linked";
    this.linkedTasks.push(task);
    return this.linkedTasks;
  }

  removeSuggestedTask(index) {
    this.suggestedTasks.splice(index,1);
    return this.suggestedTasks;
  }

}
