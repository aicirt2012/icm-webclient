import { TaskService } from '../../../shared';
import { Task } from '../../../../shared/index';
import { FormGroup } from '@angular/forms';

export class AutocompleteController {

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

  getModel() {
    return this.autocomplete;
  }

  initAutocompleteData(task: Task, isEditMode: boolean, suggestedData: any, form: FormGroup): void {
    if (isEditMode) {
      form.get('intent.intendedAction').setValue("CREATE");  // value does not matter, just need any for form to be valid
      if (task.provider.toUpperCase() === 'TRELLO') {
        this.autocomplete.trelloBoards = [TaskService.getParameter(task, 'board')];
        this.autocomplete.trelloLists.relevant = [TaskService.getParameter(task, 'list')];
        this.updateTrelloAssigneeAutocomplete(TaskService.getParameter(task, 'idBoard'), suggestedData);
      } else if (task.provider.toUpperCase() === 'SOCIOCORTEX') {
        this.autocomplete.sociocortexTasks.relevant = [task];
        this.taskService.getSociocortexWorkspaces()
          .take(1)
          .subscribe(workspaces => {
            this.autocomplete.sociocortexWorkspaces = workspaces;
          });
        this.taskService.getSociocortexCase(TaskService.getParameter(task, 'case'))
          .take(1)
          .subscribe(scCase => {
            this.autocomplete.sociocortexCases.relevant = [scCase];
            form.get('context.sociocortexWorkspace').setValue(scCase.workspace);   // TODO move this call away from this method (not autocomplete related)
          });
        this.taskService.getSociocortexMembers(task.providerId)
          .take(1)
          .subscribe(members => {
            const mentionedMembers = [], otherMembers = [];
            members.forEach(member => {
              let isMentioned = suggestedData.mentionedPersons
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
    this.autocomplete.titles.all = suggestedData.titles;
    this.autocomplete.dates.all = suggestedData.dates;
    this.autocomplete.dates.asDates = suggestedData.dates.map(date => new Date(date));
    this.autocomplete.titles.filtered = this.autocomplete.titles.all;
    this.autocomplete.dates.filtered = this.autocomplete.dates.all;
  }

  updateTrelloAssigneeAutocomplete(boardId: string, suggestedData: any) {
    this.taskService.getTrelloMembers(boardId)
      .take(1)
      .subscribe(members => {
        const mentionedMembers = [], otherMembers = [];
        members.forEach(member => {
          let isMentioned = suggestedData.mentionedPersons
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

}
