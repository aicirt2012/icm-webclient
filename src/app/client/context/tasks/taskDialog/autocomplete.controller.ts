import { TaskService } from '../../../shared';
import { Task } from '../../../../shared/index';

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

  constructor() {
  }

  onPostConstruct(task: Task, suggestedData: any, isEditMode: boolean) {
    this.task = task;
    this.suggestedData = suggestedData;
    this.isEditMode = isEditMode;
  }

  get() {
    return this.autocomplete;
  }

  initAutocompleteData(): void {
    if (this.isEditMode) {
      if (this.task.provider.toUpperCase() === 'TRELLO') {
        const boardId = TaskService.getParameter(this.task, 'board');
        this.updateTrelloBoards([boardId]);
        this.updateTrelloLists([TaskService.getParameter(this.task, 'list')]);
        this.filterTrelloLists(boardId);
      } else if (this.task.provider.toUpperCase() === 'SOCIOCORTEX') {
        this.updateSociocortexTasks([this.task], false);
      }
    }
    this.autocomplete.titles.all = this.suggestedData.titles;
    this.autocomplete.dates.all = this.suggestedData.dates;
    this.autocomplete.dates.asDates = this.suggestedData.dates.map(date => new Date(date));
    this.autocomplete.titles.filtered = this.autocomplete.titles.all;
    this.autocomplete.dates.filtered = this.autocomplete.dates.all;
  }

  filterTitles(newTitle: string): void {
    this.autocomplete.titles.filtered = this.autocomplete.titles.all
      .filter(title => title.indexOf(newTitle) == 0);
  }

  updateTrelloBoards(boards: any[]): void {
    // keep reference to all boards
    this.autocomplete.trelloBoards = boards;
    // extract and keep nested lists
    let lists = [];
    this.autocomplete.trelloBoards.forEach(board => {
      lists = lists.concat(board.lists);
    });
    this.updateTrelloLists(lists);
  }

  updateTrelloLists(lists: any[]): void {
    this.autocomplete.trelloLists.all = lists;
  }

  filterTrelloLists(boardId: string): void {
    const lists = this.autocomplete.trelloLists;
    lists.relevant = lists.all.filter(list => list.idBoard === boardId);
  }

  updateTrelloTasks(tasks): void {
    this.autocomplete.trelloTasks = tasks.filter(task => task.isOpen);
  }

  updateTrelloAssignees(members: any[]): void {
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
  }

  updateSociocortexWorkspaces(workspaces): void {
    this.autocomplete.sociocortexWorkspaces = workspaces.sort((a, b) => a.name.localeCompare(b.name));
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

}
