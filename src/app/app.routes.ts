import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { HomeComponent, AccountComponent, NoContentComponent, LoginComponent } from './pages';
import { Injectable } from '@angular/core';
import { AuthService } from './services';
import { DataResolver } from './app.resolver';
import { AuthGuard } from './app.authGuard';

export const ROUTES: Routes = [
    // TODO: reverse mechanism protected/not-protected
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  //{ path: 'info', component: InfoComponent },
  { path: 'box/:name/:id?', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  //{ path: 'unauthorized', component: UnauthorizedComponent }
  /*{
    path: 'detail', loadChildren: () => System.import('./+detail').then((comp: any) => {
      return comp.default;
    })
    ,
  },*/
  { path: '**', redirectTo: 'login' },
];
