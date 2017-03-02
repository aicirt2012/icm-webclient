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
    console.log('is auth: '+this.authService.isAuthenticated());
    this.socket = io.connect(C.socketUrl, {query: "token="+this.authService.token});//authService.token});
    this.socket.on('connect', function(){
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




}
