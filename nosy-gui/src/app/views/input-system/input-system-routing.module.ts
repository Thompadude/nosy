import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InputSystemComponent} from './input-system.component';

const routes: Routes = [
  {
    path: '',
    component: InputSystemComponent,
    data: {
      title: 'Input System'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class InputSystemRoutingModule {}
