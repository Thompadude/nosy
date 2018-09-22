import { Component } from '@angular/core';
import {AppHeaderService} from './app-header.service';
import {GlobalService} from '../../auth/global.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(private appHeaderService: AppHeaderService, private globalService: GlobalService) {
  }

  logout() {
    this.appHeaderService.logout().finally(() => this.globalService.cleanCookies())
      .subscribe();
  }
}
