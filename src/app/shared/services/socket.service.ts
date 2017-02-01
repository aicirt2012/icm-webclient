import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import C from '../constants';
import * as io from "socket.io-client";


@Injectable()
export class SocketService {

  private socket : any;

  constructor(authService: AuthService) {
    this.socket = io.connect(C.socketUrl, {query: "token="+authService.token});
    this.socket.on('connect', function(){
      console.log('Socket connection established!');
    });

    //TODO remove only for testing
    this.createEmail().subscribe(email=>{
      console.log('create email'+email);
    })
  }

  createEmail(){
    return new Observable(observer => {
      this.socket.on('message', (email) => {
        observer.next(email);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }


}
