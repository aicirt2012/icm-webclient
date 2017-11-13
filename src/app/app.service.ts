import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  private dataChange: Observable<any>;
  private dataChangeObserver: Observer<any>[] = [];

  constructor() {
    this.dataChange = new Observable((observer) => {
      this.dataChangeObserver.push(observer);
    });
  }

  private getObservableState() {
    return this.dataChange;
  }

  /** already return a clone of the current state */
  get state() {
    return this._state = this._clone(this._state);
  }

  /** never allow mutation */
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  /** use our state getter for the clone */
  private get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  private set(prop: string, value: any) {
    this._state[prop] = value;
    this.dataChangeObserver.forEach((observer) => {
      observer.next(prop);
    });
  }

  private _clone(object: InternalStateType) {
    return JSON.parse(JSON.stringify(object));
  }

  private createObserver(prop, getMethod): Observable<any> {
    return new Observable(observer => {
      this.dataChange.subscribe(dataChanged => {
        if (dataChanged == prop)
          observer.next(getMethod.apply(this));
      });
    });
  }

  /** Custom States */
  private static EMAILS = 'emails';
  private static BOXLIST = 'boxList';
  private static CURRENTBOX = 'currentBox';
  private static CURRENTEMAIL = 'currentEmail';
  private static SYNCED = 'synced';
  private static USER = 'user';


  /** BoxList */
  setBoxList(boxList: any) {
    boxList = boxList.map(box => {
      box.route = ['/box', {outlets: {'boxId': [box._id]}}];
      box.routeStr = `/box/(boxId:${box._id})`;
      return box
    });
    this.set(AppState.BOXLIST, boxList);
  }

  getBoxList() {
    return this.get(AppState.BOXLIST);
  }

  boxList(): Observable<any> {
    return this.createObserver(AppState.BOXLIST, this.getBoxList);
  }

  /** CurrentBox */
  setCurrentBox(currentBox: any) {
    this.set(AppState.CURRENTBOX, currentBox);
  }

  getCurrentBox() {
    return this.get(AppState.CURRENTBOX);
  }

  getBox(boxId) {
    return this.getBoxList().find(box => box._id === boxId);
  }

  // ensure this is working all the time
  currentBox(): Observable<any> {
    return this.createObserver(AppState.CURRENTBOX, this.getCurrentBox);
  }

  getAllLevelsChildren(boxId) {
    const box = this.getBox(boxId);
    return this.getChildren(box, []);
  }

  getChildren(box, children) {
    box.children.forEach(child => {
      children.push(child);
      this.getChildren(child, children);
    });
    return children;
  }

  /** Emails */
  setEmails(emails: any, searchTerm = '', boxId = 'EMPTY') {
    console.log('set email');
    emails = emails.map(email => {
      if (searchTerm !== '') {
        email.route = ['/search', {
          outlets: {
            'searchTerm': [searchTerm],
            'emailId': [email._id],
            'context': ['context']
          }
        }];
      } else {
        email.route = ['/box', {
          outlets: {
            'boxId': [this.getCurrentBox()._id],
            'emailId': [email._id],
            'context': ['context']
          }
        }];
      }
      email.routeStr = `/box/(boxId:${boxId}//emailId:${email._id}//context:context)`;
      return email
    });
    this.set(AppState.EMAILS, emails);
  }

  createEmail(newEmail: any) {
    const emails = this.getEmails();

    for (let i = 0; i < emails.length; i++) {
      if (emails[i].timestamp < newEmail.timestamp) {
        emails.splice(i, 0, newEmail);
        break;
      }
    }
    this.setEmails(emails);
  }

  updateEmail(modifiedEmail: any) {

    const emails = this.getEmails();

    let found = false;
    let i = 0;

    // iterate emailList, if no email to update then create
    while (i < emails.length) {
      if (emails[i]._id === modifiedEmail._id) {
        emails[i] = modifiedEmail;
        found = true;
        break;
      }
      i++;
    }

    if (found) {
      this.setEmails(emails);
    } else {
      this.createEmail(modifiedEmail);
    }

  }

  deleteEmail(email: any) {
    const emails = this.getEmails();

    for (let i = 0; i < emails.length; i++) {
      if (emails[i]._id === email._id) {
        emails.splice(i, 1);
        break;
      }
    }
    this.setEmails(emails);
  }

  getEmails() {
    return this.get(AppState.EMAILS);
  }

  emails(): Observable<any> {
    return this.createObserver(AppState.EMAILS, this.getEmails);
  }

  setCurrentEmail(currentEmail: any) {
    this.set(AppState.CURRENTEMAIL, currentEmail);
  }

  getCurrentEmail() {
    return this.get(AppState.CURRENTEMAIL);
  }

  currentEmail(): Observable<any> {
    return this.createObserver(AppState.CURRENTEMAIL, this.getCurrentEmail);
  }

  /** Synced Flag */
  setSynced(synced: any) {
    this.set(AppState.SYNCED, synced);
  }

  getSynced() {
    return this.get(AppState.SYNCED);
  }

  synced(): Observable<any> {
    return this.createObserver(AppState.SYNCED, this.getSynced);
  }

  /** User */
  setUser(user: any) {
    this.set(AppState.USER, user);
  }

  getUser() {
    return this.get(AppState.USER);
  }

  user(): Observable<any> {
    return this.createObserver(AppState.USER, this.getUser);
  }

}
