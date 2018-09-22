import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManualEmailSenderComponent} from './manual-email-sender.component';


const routes: Routes = [
  {
    path: '',
    component: ManualEmailSenderComponent,
    data: {
      title: 'Manual Email Sender'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualEmailSenderRoutingModule {}
