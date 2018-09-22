import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {ClientToken} from './client-token';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class LoginHttpService {

  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) {
  }


  public getToken(user: User) {
    return this.http.post(this.baseUrl + '/auth/token', user);
  }


}
