import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EmailTemplate} from './email-template';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class EmailHttpService {
  private baseUrl = environment.backendUrl + '/inputsystems/';


  constructor(private http: HttpClient) {
  }

  getEmailTemplates(inputSystemName): Observable<[EmailTemplate]> {

    return this.http.get<[EmailTemplate]>(this.baseUrl  + inputSystemName + '/emailtemplates/');
  }
  getAllAvailableProviders(): Observable<[string]> {
    return this.http.get<[string]>(this.baseUrl  + 'emailproviders')
  }

  postNewTemplate(newEmailTemplate, inputSystemName) {
    return this.http.post(this.baseUrl + inputSystemName + '/emailtemplates/', newEmailTemplate )

  }

  deleteEmailTemplate(emailTemplateId, inputSystemName) {
    return this.http.delete(this.baseUrl + inputSystemName + '/emailtemplates/' + emailTemplateId);
  }
  updateEmailTemplate(updateTemplate, inputSystemName, emailTemplateId){
    return this.http.put(this.baseUrl + inputSystemName + '/emailtemplates/' + emailTemplateId, updateTemplate);

  }

  postEmail(templateId, inputSystemId, postProperties){

    return this.http.post(this.baseUrl + inputSystemId + '/emailtemplates/' + templateId
      + '/post', postProperties );

  }

}
