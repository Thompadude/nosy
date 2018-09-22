import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';
import { AppComponent } from './app.component';

// Import containers
import {
  FullLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent
]



// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {GlobalService} from './auth/global.service';
import {AuthGuardService} from './auth/authguard.service';
import {AppHeaderService} from './components/app-header/app-header.service';
import {CookieService} from 'ngx-cookie-service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES


  ],
  providers: [
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy},
     AuthGuardService,
    GlobalService,
    AppHeaderService, CookieService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
