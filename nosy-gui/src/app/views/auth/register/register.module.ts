import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {RegisterService} from './register.service';



@NgModule({
  imports: [
    RegisterRoutingModule,

    ChartsModule,
    BsDropdownModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    NgSelectModule,
    FormsModule

  ],
  providers: [RegisterService],

  declarations: [ RegisterComponent]
})
export class RegisterModule { }
