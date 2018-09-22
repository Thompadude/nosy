import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {NosyHttpService} from '../../input-system/nosy-http.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ManualEmailSenderComponent } from '../manual-email-sender/manual-email-sender.component';
import {EmailHttpService} from '../email/email-http.service';
import {ManualEmailSenderRoutingModule} from './manual-email-sender-routing.module';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  imports: [
    ManualEmailSenderRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [EmailHttpService, NosyHttpService],
  declarations: [ ManualEmailSenderComponent ]
})
export class ManualEmailSenderModule { }
