import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {SMSRoutingModule} from './sms-routing.module';
import {SMSComponent} from './sms.component';



@NgModule({
  imports: [
    SMSRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ SMSComponent ]
})
export class SMSModule { }
