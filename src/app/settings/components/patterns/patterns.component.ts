import { Component } from '@angular/core';
import { UserService } from '../../shared';
import { MdSnackBar, MdInput } from '@angular/material';


@Component({
  selector: 'patterns',
  templateUrl: 'patterns.component.html',
  styleUrls: ['patterns.component.scss'],
  providers: [MdSnackBar]
})
export class PatternsComponent {

  patterns: any[];
  newPattern: string = '';

  constructor(private userService: UserService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.userService.getPatterns().subscribe((patterns: any) => {
      this.patterns = patterns;
    })
  }

  addPattern() {
    if (this.newPattern != '')  {
      this.userService.createPattern(this.newPattern).subscribe((pattern: any) => {
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
