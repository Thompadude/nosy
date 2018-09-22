import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Register} from './register';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class RegisterService {

  private baseUrl = environment.backendUrl + '/users';

  constructor(private http: HttpClient) { }

  public register(register: Register) {
    return this.http.post(this.baseUrl, register);
  }

}
