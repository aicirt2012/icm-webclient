import { Component, Input } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { TaskService } from '../../../shared';
import { AppState } from '../../../../app.service';

@Component({
  selector: 'task-dialog',
  styleUrls: ['./taskDialog.component.css'],
  templateUrl: './taskDialog.component.html'
})
export class TaskDialogComponent {

  public task: any = {};
  public suggestedTasks: any = [];
  public suggested: any = {};
  public linkedTasks: any = [];
  public email: any = {};
  public boards: any[] = [];
  public sending: boolean = false;
  public possibleMembers: any[] = [];
  public index = '';
  overdue: boolean = false;
  sticker_check: boolean = false;

  private filteredTitleSuggestions: any = [];
  private suggestedMembers: any = [];
  private nonSuggestedMembers: any = [];
  private selectedMembers: any = [];  // TODO set task.selectedMembers on submit

  @Input()
  set taskTitle(title: string) {
    if (title) {
      title = title.trim();
    }
    if (title) {
      this.task.name = title;
      this.updateTaskSuggestions();
    }
    else
      this.task.name = "";
  }

  get taskTitle(): string {
    return this.task.name;
  }

  @Input()
  set selectedBoard(board: any) {
    if (board) {
      this.task.board = board;
      this.updateMemberSuggestions();
    }
  }

  get selectedBoard(): any {
    return this.task.board;
  }

  constructor(public taskDialogRef: MatDialogRef<TaskDialogComponent>, private snackBar: MatSnackBar, private _taskService: TaskService, public appState: AppState) {
  }

  ngOnInit() {
    if (this.task.taskType == 'linked') {
      this.sticker_check = this.task.stickers.find((sticker) => sticker.image === 'check') ? true : false;
      this.overdue = this.task.date ? (new Date(this.task.date) < new Date()) : false;
    }
    this.updateTaskSuggestions();
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

  private updateMemberSuggestions() {
    this.suggestedMembers = this.getSuggestedPersons(this.suggested.persons, this.task.board.members);
    this.nonSuggestedMembers = this.getNonSuggestedPersons(this.task.board.members, this.suggestedMembers);
  }

  private updateTaskSuggestions() {
    if (this.taskTitle) {
      this.filteredTitleSuggestions = this.suggested.titles.filter(title => title.toLowerCase().indexOf(this.taskTitle.toLowerCase()) === 0);
    } else {
      this.filteredTitleSuggestions = this.suggested.titles;
    }
  }

  private getSuggestedPersons(mentionedPersons: any[], boardMembers: any[]) {
    let result = [];
    mentionedPersons.forEach(mentionedPerson => {
      boardMembers.some(boardMember => {   //.some() is like .forEach() but stops if true is returned
        if (mentionedPerson.id === boardMember.id) {
          result.push(mentionedPerson);
          return true;
        }
      })
    });
    return result;
  }

  private getNonSuggestedPersons(boardMembers: any[], suggestedPersons: any[]) {
    let result = [];
    boardMembers.forEach(boardMember => {
      let isSuggested = false;
      suggestedPersons.forEach(suggestedPerson => {
        if (boardMember.id === suggestedPerson.id) {
          isSuggested = true;
        }
      });
      if (!isSuggested) {
        result.push(boardMember);
      }
    });
    return result;
  }

}
