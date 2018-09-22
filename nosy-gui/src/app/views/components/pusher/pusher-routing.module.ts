import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PusherComponent} from './pusher.component';

const routes: Routes = [
  {
    path: '',
    component: PusherComponent,
    data: {
      title: 'Pusher'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PusherRoutingModule {}
