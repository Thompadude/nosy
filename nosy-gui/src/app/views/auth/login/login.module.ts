import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {LoginHttpService} from './login-http.service';
import {ClientToken} from './client-token';



@NgModule({
  imports: [
    LoginRoutingModule,

    ChartsModule,
    BsDropdownModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    NgSelectModule,
    FormsModule

  ],
  providers: [LoginHttpService],

  declarations: [ LoginComponent]
})
export class LoginModule { }
