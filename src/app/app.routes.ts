import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';

export const ROUTES: Routes = [
  // TODO: reverse mechanism protected/not-protected
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'box/0' },
];
