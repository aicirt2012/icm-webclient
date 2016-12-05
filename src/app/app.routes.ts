import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { LoginComponent } from './login';
import { SettingsComponent } from './settings';
import { ClientComponent } from './client';

import { Injectable } from '@angular/core';
import { AuthService } from './shared';
import { DataResolver } from './app.resolver';
import { AuthGuard } from './app.authGuard';

export const ROUTES: Routes = [
  // TODO: reverse mechanism protected/not-protected
  { path: 'box', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'box/:boxId', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'box/:boxId/:emailId', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'account', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'box' },
];
