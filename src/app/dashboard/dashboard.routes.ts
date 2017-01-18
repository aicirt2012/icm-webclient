import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../app.authGuard';
import { DashboardComponent } from './';

export const ROUTES: Routes = [
  // TODO: reverse mechanism protected/not-protected
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/timeline', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/network', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/structure', component: DashboardComponent, canActivate: [AuthGuard] }
];
