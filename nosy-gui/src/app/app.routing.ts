import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
} from './containers';
import {AuthGuardService} from './auth/authguard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './views/auth/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './views/auth/register/register.module#RegisterModule',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuardService]

      },


      {
        path: 'input-system',
        loadChildren: './views/input-system/input-system.module#InputSystemModule',
        canActivate: [AuthGuardService]

      },
      {
        path: 'email',
        loadChildren: './views/components/email/email.module#EmailModule',
        canActivate: [AuthGuardService]


      },
      {
        path: 'profile',
        loadChildren: './views/components/profile/profile.module#ProfileModule',
        canActivate: [AuthGuardService]

      },
      {
        path: 'pusher',
        loadChildren: './views/components/pusher/pusher.module#PusherModule',
        canActivate: [AuthGuardService]

      },
      /*{
        path: 'sms',
        loadChildren: './views/components/sms/sms.module#SMSModule',
        canActivate: [AuthGuardService]

      },*/
      {
        path: 'manual-email-sender',
        loadChildren: './views/components/manual-email-sender/manual-email-sender.module#ManualEmailSenderModule',
        canActivate: [AuthGuardService]

      },

    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
 // providers: [AuthGuardService]
})
export class AppRoutingModule {}
