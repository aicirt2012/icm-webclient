import { Component, ViewChild } from '@angular/core';
import { AppState } from '../../app.service';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import { Email } from '../../models';
import { EmailService } from '../../services';

@Component({
  selector: 'home',  // <home></home>
  providers: [
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public emails: Email[] = [];
  public boxList: string[];
  public loading: boolean = true;
  public syncing: boolean = false;
  private currentBox: string = 'INBOX';

  constructor(private emailService: EmailService, public appState: AppState) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.loading = true;
    this.getBoxList().subscribe((data: any[]) => {
      this.boxList = data;
      console.log("boxlist:");
      console.log(this.boxList);
    }, error => {
      console.log(error)
    }, () => {
      console.log("Init done!")
      this.appState.set('boxList', this.boxList);
      this.getEmailBox(this.currentBox);
    });;

  }

  onRefresh(refresh: boolean) {
    console.log(`refresh...let's wait for 2 seconds...`);
  }

  getBoxList() {
    return this.emailService.initMailbox();
  }

  syncBoxes(boxes: string[]) {
    this.syncing = true;
    const boxList = this.appState.get().boxList.filter((box) => box.total != 0 && box.name != '[Gmail]/Important').map((box) => box.name);
    this.emailService.getEmails(boxList).subscribe((data: any) => {
      this.getEmailBox(this.currentBox);
      this.syncing = false;
    });
  }

  getEmailBox(box?: string) {
    this.currentBox = box;
    this.loading = true;
    this.emailService
      .getEmailsWithPagination(box)
      .subscribe((data: any) => {
        this.emails = data.docs;
        this.loading = false;
      },
      error => {
        console.log(error)
      },
      () => { console.log(`${box} mails successfully loaded`) });
  }

}
