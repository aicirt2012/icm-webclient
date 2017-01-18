import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { LoginComponent } from './login';
import { SettingsComponent } from './settings';
import { DashboardComponent } from './dashboard';
import { ClientComponent } from './client';

import { Injectable } from '@angular/core';
import { AuthService } from './shared';
import { DataResolver } from './app.resolver';
import { AuthGuard } from './app.authGuard';

export const ROUTES: Routes = [
  // TODO: reverse mechanism protected/not-protected
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/box' },
];
