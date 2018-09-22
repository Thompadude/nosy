import { Injectable } from '@angular/core';
import {InputSystem} from '../../views/input-system/input-system';
import {GlobalService} from '../../auth/global.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class AppHeaderService {

  private baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private globalService: GlobalService ) {
  }
  public logout(){
    const token = this.globalService.getLocalToken();
    const headers = new HttpHeaders({'Authorization' : 'bearer ' + token});
    const _options = { headers: headers };


    return this.http.get(this.baseUrl + '/auth/logout', _options);
  }



}
