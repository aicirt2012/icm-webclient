import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../app.authGuard';
import {ClientComponent} from './';

export const ROUTES: Routes = [
  // TODO: reverse mechanism protected/not-protected
  { path: 'box', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'box/:boxId', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'box/:boxId/:emailId', component: ClientComponent, canActivate: [AuthGuard] }
];
