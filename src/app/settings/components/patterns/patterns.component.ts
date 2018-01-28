import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MatSnackBar, MatInput } from '@angular/material';


@Component({
  selector: 'patterns',
  templateUrl: 'patterns.component.html',
  styleUrls: ['patterns.component.scss'],
  providers: [MatSnackBar]
})
export class PatternsComponent {

  patterns: any[];
  newPattern: string = '';
  useAsRegex :boolean = false;
  matchTillSentenceEnd: boolean = true;
  caseSensitive: boolean= false;



  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userService.getPatterns().subscribe((patterns: any) => {
      this.patterns = patterns;
    })
  }

  addPattern() {
    if (this.newPattern != '')  {
      if(this.useAsRegex){
        this.caseSensitive =true;
        this.matchTillSentenceEnd = false;
      }
      this.userService.createPattern(this.newPattern,this.matchTillSentenceEnd,this.caseSensitive).subscribe((pattern: any) => {
        this.patterns.push(pattern);
        this.newPattern = '';
        this.matchTillSentenceEnd = true;
      });
    }
  }

  deletePattern(pattern: any) {
    this.userService.deletePattern(pattern).subscribe(() => {
      this.patterns.splice(this.patterns.findIndex((p) => p._id == pattern._id), 1);
    });
  }

}
