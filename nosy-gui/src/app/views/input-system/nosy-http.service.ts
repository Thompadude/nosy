import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InputSystem} from './input-system';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from '../../auth/global.service';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class NosyHttpService {
  private baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private globalService: GlobalService ) {
  }
  getInputSystems(): Observable<[InputSystem]> {

    // const headers: HttpHeaders = new HttpHeaders({
    //    'Authorization' : this.keycloakService.getToken().toString()
    //
    //     });
    const token = this.globalService.getLocalToken();
    const headers = new HttpHeaders({'Authorization' : 'bearer ' + token});
    const _options = { headers: headers };

    return this.http.get<[InputSystem]>(this.baseUrl + '/inputsystems', _options);
  }

  postInputSystemName(inputSystemName: string) {
    const token = this.globalService.getLocalToken();
    const headers = new HttpHeaders({'Authorization' : 'bearer ' + token});
    const _options = { headers: headers };

    const inputSystem = new InputSystem(inputSystemName);
    // noinspection JSAnnotator

    delete inputSystem.inputSystemId;
    return this.http.post(this.baseUrl + '/inputsystems', inputSystem, _options);
  }

  deleteExistingInputSystem(inputSystem: string) {
    const token = this.globalService.getLocalToken();
    const headers = new HttpHeaders({'Authorization' : 'bearer ' + token});
    const _options = { headers: headers };
    return this.http.delete(this.baseUrl + '/inputsystems/' + inputSystem, _options);
  }
  updateExistingInputSystem(inputSystem: InputSystem) {
    const token = this.globalService.getLocalToken();
    const headers = new HttpHeaders({'Authorization' : 'bearer ' + token});
    const _options = { headers: headers };
    const urlAdder = inputSystem .inputSystemId;
    return this.http.put(this.baseUrl + '/inputsystems/' + urlAdder, inputSystem, _options);
  }
}
