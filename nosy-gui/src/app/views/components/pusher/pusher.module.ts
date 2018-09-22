import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {PusherComponent} from './pusher.component';
import { PusherRoutingModule} from './pusher-routing.module';



@NgModule({
  imports: [
    PusherRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ PusherComponent ]
})
export class PusherModule { }
