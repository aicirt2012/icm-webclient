import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';


export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  dataChange: Observable<any>;
  dataChangeObserver: Observer<any>[] = [];

  constructor() {
    this.dataChange = new Observable((observer) => {
      this.dataChangeObserver.push(observer);
    });
  }

  getObservableState() {
    return this.dataChange;
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    this._state[prop] = value;
    this.dataChangeObserver.forEach((observer) => {
      observer.next(prop);
    });
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }


  setBoxList(boxList: any) {
    this.set('boxList', boxList);
  }

  getBoxList() {
    return this.get('boxList');
  }

  setCurrentBox(currentBox: any) {
    this.set('currentBox', currentBox);
  }

  getCurrentBox() {
    return this.get('currentBox');
  }

  setEmails(emails: any) {
    emails = emails.map(email => {
      email.route = `/box/${email.box}/${email._id}`;
      return email
    });
    emails.sort((a, b) => {
      const dateA: any = new Date(a.date);
      const dateB: any = new Date(b.date);
      return dateB - dateA
    });
    this.set('emails', emails);
  }

  getEmails() {
    return this.get('emails');
  }

  setSynced(synced: any) {
    this.set('synced', synced);
  }

  getSynced() {
    return this.get('synced');
  }

  setUser(user: any) {
    this.set('user', user);
  }

  getUser() {
    return this.get('user');
  }


}
