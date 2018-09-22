import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalService} from '../../../auth/global.service';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class ProfileHttpService {
  private baseUrl = environment.backendUrl + '/users';

  constructor(private http: HttpClient, private globalService: GlobalService) {
  }

  public getProfileInfo() {
    const token = this.globalService.getLocalToken();
    const headers = new HttpHeaders({'Authorization': 'bearer ' + token});
    const _options = {headers: headers};


    return this.http.get(this.baseUrl + '/profile', _options);
  }

  public deleteProfile(username) {
    const token = this.globalService.getLocalToken();
    const headers = new HttpHeaders({'Authorization': 'bearer ' + token});
    const _options = {headers: headers};
    return this.http.delete(this.baseUrl + '/profile', _options);
  }

}
