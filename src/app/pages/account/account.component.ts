import { Component } from '@angular/core';
import { AuthService } from '../../../../services';
import { Router } from '@angular/router';
import { AppState } from '../../../../app.service';

@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
})
export class AccountComponent {
  model: any = {};
  loading = false;
  error = '';
  public currentView: string = 'Overview';

  constructor(
    private router: Router,
    private _auth: AuthService,
    public appState: AppState) { }

  ngOnInit() {
    // reset login status
    console.log('Hello account Component');
    console.log(this.appState.get());
  }

  login() {
    this.loading = true;
    this._auth.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  showView(view: string): void{
      this.currentView = view;
      console.log("changed view to " + view);
  }

  getCurrentView(view: string) : boolean{
    console.log("get current view method");
      if(this.currentView == view)
           return true;
      else
           return false;
  }

  getActive(choice: string) : string{
      if(this.currentView == choice)
           return "active";
      else
           return "";
  }
}
