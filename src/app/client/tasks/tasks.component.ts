import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Email } from '../shared';
import { TaskService } from '../shared';
import { TaskDialogType, DialogType} from '../../shared/constants';
import { TaskDialogComponent } from '../taskDialog';

@Component({
  selector: 'tasks',  // <taskList></taskList>
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  @Input() boards: any;
  @Output() syncTasksForMail = new EventEmitter<any>();
  @Output() closeTaskModalOutput = new EventEmitter<any>();
  public currentTab: string = 'Trello';

  /* we have to get this from backend */
  private taskIdList: string = '582639655429c571aae95b37';
  private taskList: any = null;
  private createdTask: any = null;
  public suggestedTasks: any = [];
  public linkedTasks: any = [];
  private dialogConfig = {
    width:"70%",
    height:'70%'
  }

  constructor(private _taskService: TaskService, public dialog: MdDialog) {
  }

  ngOnInit() {
    console.log('hello `TaskList` component');
    console.log('email', this.email);
  }

  ngOnChanges() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];

  }

  getAllTasks() {
    this._taskService.getAllTasks(this.taskIdList).subscribe((tasks) => {
      this.taskList = tasks;
      console.log(this.taskList);
    });
  }

  createTask(taskObject: any) {
    console.log("list id in tasks: " + taskObject.idList);
    // only pass ID?
    this._taskService.createTask(this.email, taskObject)
      .subscribe((task: any) => {
        this.createdTask = task;
        console.log("task has been created");
      },
      error => {
        console.log(error);
      },
      () => {});
  }

  syncTasks() {
    this.syncTasksForMail.emit();
  }

  openDialog(task: any) {
    let taskDialogRef: MdDialogRef<TaskDialogComponent> = this.dialog.open(TaskDialogComponent, this.dialogConfig);
    taskDialogRef.componentInstance.task = task;
  }

}
