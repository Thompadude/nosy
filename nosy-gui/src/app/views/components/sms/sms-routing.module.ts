import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SMSComponent} from './sms.component';

const routes: Routes = [
  {
    path: '',
    component: SMSComponent,
    data: {
      title: 'SMS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SMSRoutingModule {}
