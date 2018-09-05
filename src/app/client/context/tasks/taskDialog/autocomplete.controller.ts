import { TaskService } from '../../../shared';
import { Task } from '../../../../shared/index';
import { FormGroup } from '@angular/forms';

export class AutocompleteController {

  private isEditMode: boolean;
  private task: any;
  private suggestedData: { titles: any[], dates: any[], mentionedPersons: any[] };

  autocomplete = {
    titles: {
      all: [],
      filtered: []
    },
    trelloBoards: [],
    trelloLists: {
      all: [],
      relevant: []
    },
    trelloTasks: [],
    assignees: {
      suggested: [],
      other: []
    },
    sociocortexWorkspaces: [],
    sociocortexCases: {
      relevant: [],
      filtered: []
    },
    sociocortexTasks: {
      relevant: [],
      filtered: []
    },
    owner: {
      suggested: [],
      other: []
    },
    dates: {
      all: [],
      filtered: [],
      asDates: []
    }
  };

  constructor(private taskService: TaskService) {
  }

  onPostConstruct(task: Task, suggestedData: any, isEditMode: boolean) {
    this.task = task;
    this.suggestedData = suggestedData;
    this.isEditMode = isEditMode;
  }

  get() {
    return this.autocomplete;
  }

  initAutocompleteData(form: FormGroup): void {
    if (this.isEditMode) {
      form.get('intent.intendedAction').setValue("CREATE");  // TODO replace dummy value by custom validator that respects the edit mode
      if (this.task.provider.toUpperCase() === 'TRELLO') {
        this.autocomplete.trelloBoards = [TaskService.getParameter(this.task, 'board')];
        this.autocomplete.trelloLists.relevant = [TaskService.getParameter(this.task, 'list')];
        this.updateTrelloAssignees(TaskService.getParameter(this.task, 'idBoard'));
      } else if (this.task.provider.toUpperCase() === 'SOCIOCORTEX') {
        this.autocomplete.sociocortexTasks.relevant = [this.task];
        this.taskService.getSociocortexWorkspaces()
          .take(1)
          .subscribe(workspaces => {
            this.autocomplete.sociocortexWorkspaces = workspaces;
          });
        this.taskService.getSociocortexCase(TaskService.getParameter(this.task, 'case'))
          .take(1)
          .subscribe(scCase => {
            this.autocomplete.sociocortexCases.relevant = [scCase];
            form.get('context.sociocortexWorkspace').setValue(scCase.workspace);   // TODO move this call away from this method (not autocomplete related)
          });
        this.taskService.getSociocortexMembers(this.task.providerId)
          .take(1)
          .subscribe(members => {
            const mentionedMembers = [], otherMembers = [];
            members.forEach(member => {
              let isMentioned = this.suggestedData.mentionedPersons
                .some(nameString => member.fullName.indexOf(nameString) > -1);
              if (isMentioned)
                mentionedMembers.push(member);
              else
                otherMembers.push(member);
            });
            this.autocomplete.owner.other = otherMembers;
            this.autocomplete.owner.suggested = mentionedMembers;
          });
      }
    }
    this.autocomplete.titles.all = this.suggestedData.titles;
    this.autocomplete.dates.all = this.suggestedData.dates;
    this.autocomplete.dates.asDates = this.suggestedData.dates.map(date => new Date(date));
    this.autocomplete.titles.filtered = this.autocomplete.titles.all;
    this.autocomplete.dates.filtered = this.autocomplete.dates.all;
  }

  updateTrelloAssignees(boardId: string): void {
    this.taskService.getTrelloMembers(boardId)
      .take(1)
      .subscribe(members => {
        const mentionedMembers = [], otherMembers = [];
        members.forEach(member => {
          let isMentioned = this.suggestedData.mentionedPersons
            .some(nameString => member.fullName.indexOf(nameString) > -1);
          if (isMentioned)
            mentionedMembers.push(member);
          else
            otherMembers.push(member);
        });
        this.autocomplete.assignees.other = otherMembers;
        this.autocomplete.assignees.suggested = mentionedMembers;
      });
  }

  updateSociocortexOwner(members: any[]): void {
    const mentionedMembers = [], otherMembers = [];
    members.forEach(member => {
      let isMentioned = this.suggestedData.mentionedPersons
        .some(nameString => member.fullName.indexOf(nameString) > -1);
      if (isMentioned)
        mentionedMembers.push(member);
      else
        otherMembers.push(member);
    });
    this.autocomplete.owner.other = otherMembers;
    this.autocomplete.owner.suggested = mentionedMembers;
  }

  updateTrelloTasks(tasks): void {
    this.autocomplete.trelloTasks = tasks.filter(task => task.isOpen);
  }

  filterTrelloLists(boardId: string): void {
    const lists = this.autocomplete.trelloLists;
    lists.relevant = lists.all.filter(list => list.idBoard === boardId);
  }

  updateSociocortexCases(cases): void {
    this.autocomplete.sociocortexCases.relevant = cases;
  }

  updateSociocortexTasks(tasks: any[], allowOnlyEnabled: boolean): void {
    if (allowOnlyEnabled)
      this.autocomplete.sociocortexTasks.relevant = tasks
        .filter(task => TaskService.getParameter(task, 'state') === 'ENABLED');
    else
      this.autocomplete.sociocortexTasks.relevant = tasks
        .filter(task => task.isOpen);
  }

}
