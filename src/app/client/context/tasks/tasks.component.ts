import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { TaskService } from '../../shared';
import { TaskDialogComponent } from './taskDialog';
import { LinkTaskDialogComponent } from './linkTaskDialog';
import { AppState } from '../../../app.service';

@Component({
  selector: 'tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  public errorTrello = false;
  public boards: any;
  public user: any;
  public linkedTasks: any = [];
  private dialogConfig = {
    width: "35%",
    height: 'auto',
  };
  private linkTaskDialogConfig = {
    width: '70%',
    height: 'auto'
  };

  constructor(private _taskService: TaskService, public dialog: MatDialog, public snackBar: MatSnackBar, public appState: AppState) {
  }

  ngOnInit() {
    this.user = this.appState.getUser();
    if (this.user.trello) {
      this.getAllBoards();
      this.errorTrello = false;
    }
    else {
      this.errorTrello = true;
    }
  }

  createTask(taskObject: any) {
    this._taskService.createTask(this.email, taskObject)
      .subscribe((task: any) => {
          this.snackBar.open('Task successfully created.', 'OK');
        },
        error => {
          console.log(error);
          this.snackBar.open('Error while creating task.', 'OK');
        });
  }

  getAllBoards() {
    this._taskService.getAllBoards()
      .subscribe((data: any) => {
          this.boards = data;
        },
        error => {
          console.log(error)
        });
  }

  openDialog(task: any) {
    let taskDialogRef: MatDialogRef<TaskDialogComponent> = this.dialog.open(TaskDialogComponent, this.dialogConfig);
    taskDialogRef.componentInstance.task = task;
    taskDialogRef.componentInstance.email = this.email;
    taskDialogRef.componentInstance.boards = this.boards;
    taskDialogRef.componentInstance.suggested = this.email.suggestedData;
  }

  deleteTask(task: any) {
    if (task.taskType == 'suggested') {
      this.email.suggestedTasks.splice(task.index, 1);
    }
    else {
      this.email.linkedTasks.splice(task.index, 1);
    }
  }

  openLinkTaskDialog(task: any) {
    let linkTaskDialogRef: MatDialogRef<LinkTaskDialogComponent> = this.dialog.open(LinkTaskDialogComponent, this.linkTaskDialogConfig);
    linkTaskDialogRef.componentInstance.task = task;
    linkTaskDialogRef.componentInstance.email = this.email;
    linkTaskDialogRef.componentInstance.boards = this.boards;
  }

  /* change highlightstatus { sentenceId, highlight(true/false)}*/
  highlightSentence(h: any) {
    const sentence = this.email.sentences.find((s) => s.id == h.id);
    this.email.sentences.forEach((s) => {
      s.highlighted = false
    });
    sentence.highlighted = h.highlight;
  }

  hightlightTaskItem(h: any) {
    this.email.suggestedTasks.forEach((t) => {
      t.highlight = false;
      if (t.task.id == h.id) {
        t.highlight = h.highlight;
      }
    });
  }

  openLinkTask() {
    if (this.boards.length > 0) {
      let b = this.boards[0];
      this.openLinkTaskDialog({'taskType': 'linked', 'board': b,});
    }
    else {
      this.openLinkTaskDialog({'taskType': 'linked'});
    }
  }

  openTaskDialog() {
    if (this.boards.length > 0) {
      this.openDialog({
        'taskType': 'suggested',
        'status': 'empty'
      });
    }
    else {
      this.openDialog({'taskType': 'suggested', 'status': 'empty', 'name': this.email.subject});
    }
  }

}
