import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {EmailRoutingModule} from './email-routing.module';
import {EmailComponent} from './email.component';
import {EmailHttpService} from './email-http.service';
import { HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {NosyHttpService} from '../../input-system/nosy-http.service';
import {FormsModule} from '@angular/forms';
import { ManualEmailSenderComponent } from '../manual-email-sender/manual-email-sender.component';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  imports: [
    EmailRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [EmailHttpService, NosyHttpService],
  declarations: [ EmailComponent ]
})
export class EmailModule { }
