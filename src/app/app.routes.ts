import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { EmailComponent, SettingsComponent, NoContentComponent, LoginComponent } from './pages';
import { Injectable } from '@angular/core';
import { AuthService } from './services';
import { DataResolver } from './app.resolver';
import { AuthGuard } from './app.authGuard';

export const ROUTES: Routes = [
    // TODO: reverse mechanism protected/not-protected
  { path: 'box', component: EmailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'box/:boxId', component: EmailComponent, canActivate: [AuthGuard] },
  { path: 'box/:boxId/:emailId', component: EmailComponent, canActivate: [AuthGuard] },
  { path: 'account', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'box' },
];
