import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';


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

  private get(prop?: any) {
    // use our state getter for the clone
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
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }

  private createObserver(prop, getMethod): Observable<any>{
    return new Observable(observer => { 
      this.dataChange.subscribe(dataChanged=>{   
        if(dataChanged == prop)     
          observer.next(getMethod.apply(this));  
      });          
    });
  }

  private static EMAILS = 'emails';
  private static BOXLIST = 'boxList'; 
  private static CURRENTBOX = 'currentBox';
  private static SYNCED = 'synced';
  private static USER = 'user';

  
  /** BoxList */
  setBoxList(boxList: any) {
    this.set(AppState.BOXLIST, boxList);
  }

  getBoxList() {
    return this.get(AppState.BOXLIST);
  }

  boxList(): Observable<any>{
    return this.createObserver(AppState.BOXLIST, this.getBoxList);
  }

  /** CurrentBox */
  setCurrentBox(currentBox: any) {
    this.set(AppState.CURRENTBOX, currentBox);
  }

  getCurrentBox() {
    return this.get(AppState.CURRENTBOX);
  }

  currentBox(): Observable<any>{
    return this.createObserver(AppState.CURRENTBOX, this.getCurrentBox);
  }

  /** Emails */
  // customRoute: /root/rootId
  setEmails(emails: any, customRoute = 'NONE') {
    if (customRoute != 'NONE') {
      emails = emails.map(email => {
        email.route = `${customRoute}/${email._id}`;
        return email
      });
    } else {
      emails = emails.map(email => {
        email.route = `/box/${email.box}/${email._id}`;
        return email
      });
    }
    emails.sort((a, b) => {
      const dateA: any = new Date(a.date);
      const dateB: any = new Date(b.date);
      return dateB - dateA
    });
    this.set(AppState.EMAILS, emails);
  }

  getEmails() {
    return this.get(AppState.EMAILS);
  }

  emails(): Observable<any>{
    return this.createObserver(AppState.EMAILS, this.getEmails);
  }
  
  /** Synced Flag */
  setSynced(synced: any) {
    this.set(AppState.SYNCED, synced);
  }

  getSynced() {
    return this.get(AppState.SYNCED);
  }

  synced(): Observable<any>{
    return this.createObserver(AppState.SYNCED, this.getSynced);
  }

  /** User */
  setUser(user: any) {
    this.set(AppState.USER, user);
  }

  getUser() {
    return this.get(AppState.USER);
  }

  user(): Observable<any>{
    return this.createObserver(AppState.USER, this.getUser);
  }

}
