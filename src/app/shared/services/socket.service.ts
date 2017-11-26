import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import C from '../constants';
import * as io from "socket.io-client";


@Injectable()
export class SocketService {

  private socket: any;

  constructor(private authService: AuthService) {

  }

  openSocketConnection() {
    if (!this.authService.isAuthenticated()) {
      console.log('Could not create socket - not authenticated!');
    } else {
      console.log('socket service');
      console.log(C);
      console.log(C.socketUrl);
      this.socket = io.connect(C.socketUrl, {query: "token=" + this.authService.token});
      this.socket.on('connect', () => {
        console.log('Socket connection established!');
      });
    }
  }

  createEmail() {
    return new Observable(observer => {
      this.socket.on('create_email', (email) => {
        observer.next(JSON.parse(email));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  deleteEmail() {
    return new Observable(observer => {
      this.socket.on('delete_email', (email) => {
        observer.next(JSON.parse(email));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  updateEmail() {
    return new Observable(observer => {
      this.socket.on('update_email', (email) => {
        observer.next(JSON.parse(email));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  createBox() {
    return new Observable(observer => {
      this.socket.on('create_box', (box) => {
        observer.next(JSON.parse(box));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  updateBox() {
    return new Observable(observer => {
      this.socket.on('update_box', (box) => {
        observer.next(JSON.parse(box));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  deleteBox() {
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
