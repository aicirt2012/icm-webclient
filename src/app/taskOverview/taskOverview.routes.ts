import { TaskOverviewComponent } from './';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../app.authGuard';

export const ROUTES: Routes = [
  // TODO: reverse mechanism protected/not-protected
  { path: 'task-overview', component: TaskOverviewComponent, canActivate: [AuthGuard] },
];
