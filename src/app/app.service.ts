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


  private static BOXLIST = 'boxList'; 

  setBoxList(boxList: any) {
    this.set(AppState.BOXLIST, boxList);
  }

  getBoxList() {
    return this.get(AppState.BOXLIST);
  }

  boxList(){
    return new Observable(observer => {    
      this.dataChange.subscribe(dataChanged=>{   
        if(dataChanged == AppState.BOXLIST)     
          observer.next(this.getBoxList());  
      });          
    });
  }

  setCurrentBox(currentBox: any) {
    this.set('currentBox', currentBox);
  }

  getCurrentBox() {
    return this.get('currentBox');
  }

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
    this.set('emails', emails);
  }

  getEmails() {
    return this.get('emails');
  }

  emails(){
    return new Observable(observer => {    
      this.dataChange.subscribe(dataChanged=>{   
        if(dataChanged == 'emails')     
          observer.next(this.getEmails());  
      });          
    });
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
