import { Injectable } from '@angular/core';

@Injectable()
export class SnackbarService {
  public message: string;
  public show: boolean = false;

  constructor() {
  }

  setMessage(message) {
    this.message = message;
  }

  setShow() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
