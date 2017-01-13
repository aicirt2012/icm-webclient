import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthService } from '../shared'; // all services
import { LoginComponent } from './';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule.forRoot(), FlexLayoutModule.forRoot()],
  providers: [],
})

export class LoginModule { }
