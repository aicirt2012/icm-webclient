import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../app.authGuard';
import {ClientComponent} from './';
import {EmailDetailedViewComponent} from './emailDetailedView';
import {EmailListComponent} from './emailList';

export const ROUTES = [
  { path: 'box', component: ClientComponent, canActivate: [AuthGuard], children: [
    {
    path: ':boxId', component: EmailListComponent, children: [
      { path: ':emailId', component: EmailDetailedViewComponent }
    ]
  }
  ] },
  
];
