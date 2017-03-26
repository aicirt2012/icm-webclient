import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import C from '../constants';
import * as io from "socket.io-client";


@Injectable()
export class SocketService {

  private socket : any;

  constructor(private authService: AuthService) {

  }

  openSocketConnection(){
    if(!this.authService.isAuthenticated()){
      console.log('Could not create socket - not authenticated!');
    }else{
      this.socket = io.connect(C.socketUrl, {query: "token="+this.authService.token});
      this.socket.on('connect', ()=>{
        console.log('Socket connection established!');
      });

      //TODO remove only for testing
      this.createEmail().subscribe((email:any)=>{
        console.log('create email: '+email.subject);
      });

      //TODO remove only for testing
      this.updateEmail().subscribe((email:any)=>{
        console.log('update email: '+email.subject);
      });

      //TODO remove only for testing
      this.deleteEmail().subscribe((email:any)=>{
        console.log('delete email: '+email.subject);
      });

      //TODO remove only for testing
      this.createBox().subscribe((box:any)=>{
        console.log('create box: '+box.name);
      });

      //TODO remove only for testing
      this.updateBox().subscribe((box:any)=>{
        console.log('update box: '+box.name);
      });

      //TODO remove only for testing
      this.deleteBox().subscribe((box:any)=>{
        console.log('delete box: '+box.name);
      });
    }
  }

  createEmail(){
    return new Observable(observer => {
      this.socket.on('create_email', (email) => {
        observer.next(JSON.parse(email));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  deleteEmail(){
    return new Observable(observer => {
      this.socket.on('delete_email', (email) => {
        observer.next(JSON.parse(email));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  updateEmail(){
    return new Observable(observer => {
      this.socket.on('update_email', (email) => {
        observer.next(JSON.parse(email));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  createBox(){
    return new Observable(observer => {
      this.socket.on('create_box', (box) => {
        observer.next(JSON.parse(box));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  updateBox(){
    return new Observable(observer => {
      this.socket.on('update_box', (box) => {
        observer.next(JSON.parse(box));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  deleteBox(){
    return new Observable(observer => {
      this.socket.on('delete_box', (box) => {
        observer.next(JSON.parse(box));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
