import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Email } from '../shared';
import { TaskService } from '../shared';
import { TaskDialogType, DialogType} from '../../shared/constants';
import { TaskDialogComponent } from '../taskDialog';
import { LinkTaskDialogComponent } from '../linkTaskDialog';
import { AppState } from '../../app.service';

@Component({
  selector: 'tasks',  
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})

export class TasksComponent {

  @Input() email: any;
  @Output() setSuggestedFilters = new EventEmitter<any>();
  @Output() setLinkedFilters = new EventEmitter<any>();
  public errorTrello = false;
  public boards: any;
  public user: any;
  public suggestedTasks: any = [];
  public linkedTasks: any = [];
  public suggestedTasks$: any;
  public linkedTasks$: any = [];
  private dialogConfig = {
    width: "70%",
    height: '70%',
  }
  private linkTaskDialogConfig = {
    width: '60%',
    height: '40%'
  }
  public showSuggested: boolean = true;
  public showLinked: boolean = true;

  constructor(private _taskService: TaskService, public dialog: MdDialog, public snackBar: MdSnackBar, public appState: AppState) {
  }

  ngOnInit() {
     this.user = this.appState.get('user');
    if (this.user.trello) {
      this.getAllBoards();
    }
    else {
      this.errorTrello = true;
    }
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    this.appState.set('suggestedTasks', this.suggestedTasks);
    this.appState.set('linkedTasks', this.linkedTasks);
  }

  ngOnChanges() {
    this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
    this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];
    this.suggestedTasks$ = this.appState.dataChange.subscribe((res) => {
      //console.log("suggestedTasks have changed");
        //this.email = this.appState.get('email');
        //this.suggestedTasks = this.email.suggestedTasks ? this.email.suggestedTasks : [];
           
        console.log("just overwrote suggestedTasks");
        this.linkedTasks = this.email.linkedTasks ? this.email.linkedTasks : [];

    });
   
    //this.appState.set('suggestedTasks', this.suggestedTasks);

  }

  createTask(taskObject: any) {
    this._taskService.createTask(this.email, taskObject)
      .subscribe((task: any) => {
        this.snackBar.open('Task successfully created.', 'OK');
      },
      error => {
        console.log(error);
        this.snackBar.open('Error while creating task.', 'OK');
      },
      () => { });
  }

  getAllBoards() {
    this._taskService.getAllBoards()
      .subscribe((data: any) => {
        this.boards = data;
      },
      error => {
        console.log(error)
      },
      () => {
        console.log("all boards success")
      });
  }

  openDialog(task: any) {
    let taskDialogRef: MdDialogRef<TaskDialogComponent> = this.dialog.open(TaskDialogComponent, this.dialogConfig);
    taskDialogRef.componentInstance.task = task;
    taskDialogRef.componentInstance.email = this.email;
    taskDialogRef.componentInstance.boards = this.boards;
  }

  deleteTask(task: any) {
    if (task.taskType == 'suggested') {
      this.suggestedTasks.splice(task.index, 1);
      this.appState.set('suggestedTasks', this.suggestedTasks);
    }
    else {
      this.linkedTasks.splice(task.index, 1);
      this.appState.set('linkedTasks', this.linkedTasks);
    }
  }

  openLinkTaskDialog(task: any) {
    let linkTaskDialogRef: MdDialogRef<LinkTaskDialogComponent> = this.dialog.open(LinkTaskDialogComponent, this.linkTaskDialogConfig);
    linkTaskDialogRef.componentInstance.task = task;
    linkTaskDialogRef.componentInstance.email = this.email;
    linkTaskDialogRef.componentInstance.boards = this.boards;
  }

  highlightSentence(h: any) {
    const sentence = this.email.sentences.find((s) => s.id == h.id);
    this.email.sentences.forEach((s) => { s.highlighted = false });
    sentence.highlighted = h.highlight;
    this.appState.set('email', this.email);
  }

   hightlightTaskItem(h: any) {
    let suggestedTasks = this.email.suggestedTasks;
    suggestedTasks.forEach((t) => { t.highlight = false });
    suggestedTasks = suggestedTasks.map((t) => { if(t.task.id == h.id) t.highlight = h.highlight; return t} );  
    this.email.suggestedTasks = suggestedTasks;
    this.appState.set('email', this.email);
  }

  openLinkTask() {
      this.openLinkTaskDialog({'taskType': 'linked'});
  }

  openTaskDialog() {
      this.openDialog({'taskType': 'suggested','status':'empty'});
  }

  setSuggestedFilter(checked: boolean) {
    this.showSuggested = checked;
  }

  setLinkedFilter(checked: boolean) {
    this.showLinked = checked;
  }

}
