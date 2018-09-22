import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {InputSystemComponent} from './input-system.component';
import {InputSystemRoutingModule} from './input-system-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {NosyHttpService} from './nosy-http.service';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';



@NgModule({
  imports: [
    InputSystemRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    NgSelectModule,
    FormsModule

  ],
  providers: [NosyHttpService],

  declarations: [ InputSystemComponent ]
})
export class InputSystemModule { }
