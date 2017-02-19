import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../app.authGuard';
import {SettingsComponent} from './';

export const ROUTES: Routes = [
  // TODO: reverse mechanism protected/not-protected
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/email', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/patterns', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/tasks', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/overview', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings/help', component: SettingsComponent, canActivate: [AuthGuard] },
];
