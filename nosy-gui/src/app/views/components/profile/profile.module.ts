import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileHttpService} from './profile-http.service';
import { HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ProfileComponent} from './profile.component';



@NgModule({
  imports: [
    ProfileRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [ProfileHttpService, ProfileHttpService],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }
