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
  isRegex :boolean = false;



  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userService.getPatterns().subscribe((patterns: any) => {
      this.patterns = patterns;
    })
  }

  addPattern() {
    if (this.newPattern != '')  {

      this.userService.createPattern(this.newPattern,this.isRegex).subscribe((pattern: any) => {
        this.patterns.push(pattern);
        this.newPattern = '';
       });
    }
  }

  deletePattern(pattern: any) {
    this.userService.deletePattern(pattern).subscribe(() => {
      this.patterns.splice(this.patterns.findIndex((p) => p._id == pattern._id), 1);
    });
  }

}
