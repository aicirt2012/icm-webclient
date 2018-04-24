import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../app.authGuard';
import { ClientComponent } from './';
import { EmailDetailedViewComponent } from './emailDetailedView';
import { EmailListComponent } from './emailList';
import { ContextComponent } from './context/context.component';

export const ROUTES = [
  {
    path: 'box', component: ClientComponent, canActivate: [AuthGuard],
    children: [
      {
        path: ':boxId', component: EmailListComponent, outlet: 'boxId'
      },
      {
        path: ':emailId', component: EmailDetailedViewComponent, outlet: 'emailId'
      },
      {
        path: ':context', component: ContextComponent, outlet: 'context'
      }
    ]
  },
  {
    path: 'search', component: ClientComponent, canActivate: [AuthGuard],
    children: [
      {
        path: ':searchTerm', component: EmailListComponent, outlet: 'searchTerm',
      },
      {
        path: ':emailId', component: EmailDetailedViewComponent, outlet: 'emailId'
      },
      {
        path: ':context', component: ContextComponent, outlet: 'context'
      }
    ]
  }
];
