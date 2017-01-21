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
  public selectedTask: any = {};

  constructor(public linkTaskDialogRef: MdDialogRef<LinkTaskDialogComponent>, private snackBar: MdSnackBar, private _taskService: TaskService, public appState: AppState) {
  }

  ngOnInit() {
      this.suggestedTasks = this.appState.get('suggestedTasks');
      this.linkedTasks = this.appState.get('linkedTasks');
  }

  linkTask() {
    this.sending = true;
    this._taskService.linkTask(this.email, this.task)
      .subscribe((task: any) => {
        console.log(this.task);
        console.log(task);
        this.sending = false;
        this.snackBar.open('Task successfully linked.', 'OK');
        this.closeDialog();
      },
      error => {
        console.log(error);
        this.sending=false;
        this.snackBar.open('Error while linking task.', 'OK');
      },
      () => {});
  }

  closeDialog() {
    this.linkTaskDialogRef.close();
  }

  onSelectBoard(board:any) {
    this.task.possibleMembers = [].concat(board.members);
    this.task.selectedMembers = this.task.selectedMembers == undefined ? [] : this.task.selectedMembers;
  }

}
