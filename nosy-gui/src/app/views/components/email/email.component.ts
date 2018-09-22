import {Component, OnInit, ViewChild} from '@angular/core';
import {NosyHttpService} from '../../input-system/nosy-http.service';
import {EmailHttpService} from './email-http.service';
import {InputSystem} from '../../input-system/input-system';
import {EmailTemplate} from './email-template';
import {Form, NgForm} from '@angular/forms';
import {NgSelectComponent, NgSelectModule} from '@ng-select/ng-select';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html'

})
export class EmailComponent implements OnInit {
  private selectedInputSystem: string;
  private selectedInputSystemId: string;
  private selectedEmailTemplate: EmailTemplate;
  private selectedEmailTemplateId: string;
  private inputSystemIdFotTemplateCreationId: string;
  private isSelectedEmailTemplate: boolean;
  private isSelectedInputSystem: boolean;
  private isSelectedInputSystemForPost: boolean;

  private inputSystems: InputSystem[];
  private availableProviders: [string];
  private postSuccessMessage: string;
  private isPostSuccess: boolean;
  private colourPostSuccessMessage: string;
  private emailTemplates: EmailTemplate[];
  private operationsUpdateAndDelete: string;
  private isOperationsUpdateAndDelete: boolean;
  private colourOperationsUpdateAndDelete: string;

  @ViewChild('chosenuser') public ngSelect: NgSelectComponent;



  constructor(private nosyHttpService: NosyHttpService, private emailHttpService: EmailHttpService) {
  }

  ngOnInit() {
    this.nosyHttpService.getInputSystems().subscribe(
      data => {
        this.inputSystems = data;
      })
    this.emailHttpService.getAllAvailableProviders().subscribe(
      data => {
        this.availableProviders = data;
      });

  }



  onClearInputSystem(){
    this.isSelectedEmailTemplate = false;
    this.isSelectedInputSystem = false;

  }

  onClearEmailTemplate(){
    this.isSelectedEmailTemplate = false;

  }
  onChangeInputSystemFirstForm() {
    if(this.selectedInputSystemId !== null) {

    this.allFormReset();
    this.ngSelect.clearModel();

    this.isSelectedInputSystem = false;
    this.emailTemplates = [];
    this.isSelectedEmailTemplate = false;
    this.emailHttpService.getEmailTemplates(this.selectedInputSystemId).subscribe(
      data => {
        this.emailTemplates = data;
        if (this.emailTemplates.length > 0) {
          this.isSelectedInputSystem = true;

          this.isSelectedEmailTemplate = false;
        }
      });
    }


  }

  onChangeEmailTemplateFirstForm(selectedEmailTemplate) {
    this.allFormReset();
    this.selectedEmailTemplate = selectedEmailTemplate;
    this.isSelectedEmailTemplate = true;

  }

  allFormReset() {
    this.secondForm('', '', false);
    this.firstForm('', '', false);
  }

  firstForm(colour, message, isEnabled) {
    this.colourOperationsUpdateAndDelete = colour;
    this.isOperationsUpdateAndDelete = isEnabled;
    this.operationsUpdateAndDelete = message;
  }

  secondForm(colour, message, isEnabled) {
    this.colourPostSuccessMessage = colour;
    this.isPostSuccess = isEnabled;
    this.postSuccessMessage = message;
  }

  updateExistingTemplateFirstForm(form: NgForm) {


    const formInputSystem = form.value;
    if (formInputSystem.emailTemplateName === '' || formInputSystem.fromAddress === '' ||
      formInputSystem.emailTemplateTo === '' || formInputSystem.emailFromProvider === '' ||
      formInputSystem.text === '' || formInputSystem.subject === '') {
      this.firstForm('red',
        'One or more mandatory fields are not specified', true);


    } else {

      let emailTemplate: EmailTemplate;
      let emailTo = formInputSystem.emailTemplateTo1.trim().split(',');

      emailTo.forEach(function (part, index, theArray) {
        theArray[index] = theArray[index].trim();
      });

      emailTemplate = new EmailTemplate(formInputSystem.emailFromProvider, formInputSystem.emailTemplateName, emailTo,
        formInputSystem.fromAddress, 0, 0, 0, formInputSystem.subject, formInputSystem.text)

      if (formInputSystem.emailTemplateCc1 != '') {
        const emailCc = formInputSystem.emailTemplateCc1.trim().split(',');
        emailCc.forEach(function (part, index, theArray) {
          theArray[index] = theArray[index].trim();
        });

        emailTemplate.setEmailCc(emailCc);
      }


      this.emailHttpService.updateEmailTemplate(emailTemplate,
        this.selectedInputSystemId, this.selectedEmailTemplateId).subscribe(
        (response: any) => {
          this.firstForm('green', 'Email Template '
            + this.selectedEmailTemplate.emailTemplateName + ' updated!',
            true)
          this.selectedEmailTemplate = response;

          this.emailTemplates.splice(this.emailTemplates.indexOf(
            this.emailTemplates.find(x => x.emailTemplateId === this.selectedEmailTemplateId)), 1);
          this.emailTemplates = [...this.emailTemplates, response]

        },
        err => {

          this.firstForm('red', err.error, true)


        });
    }

  }

  deleteExistingTemplate() {


    this.emailHttpService.deleteEmailTemplate(this.selectedEmailTemplateId, this.selectedInputSystemId).subscribe(
      (response: Response) => {
        this.firstForm('green', 'Successfully Deleted ' + this.selectedEmailTemplate.emailTemplateName + 'from the System', true);
        this.emailTemplates.splice(this.emailTemplates.indexOf(
          this.emailTemplates.find(x => x.emailTemplateId === this.selectedEmailTemplateId)), 1);
        this.emailTemplates = [...this.emailTemplates];

      })
  }

  onAddNewEmailTemplate(form: NgForm) {

    const newTemplate = form.value;
    if (newTemplate.newFromProvider === '') {
      newTemplate.newFromProvider = 'Default';
    }
    if (newTemplate.inputSystemIdFotTemplateCreation === '' || newTemplate.newEmailTemplateName === '' ||
      newTemplate.newFromProvider === '' || newTemplate.newFromAddress === '' || newTemplate.newSubject === '' ||
      newTemplate.newEmailTo === '' || newTemplate.newEmailText === '') {

      this.secondForm('red',
        'One or more mandatory fields are not specified', true)
    } else {
      const emailCc = newTemplate.newEmailCc.trim().split(',');
      const emailTo = newTemplate.newEmailTo.trim().split(',');
      let emailTemplate: EmailTemplate;

      emailTo.forEach(function (part, index, theArray) {
        theArray[index] = theArray[index].trim();
      });

      emailTemplate = new EmailTemplate(newTemplate.newFromProvider, newTemplate.newEmailTemplateName, emailTo, newTemplate.newFromAddress,
        0, 0, 0, newTemplate.newSubject, newTemplate.newEmailText);

      if (newTemplate.newEmailCc != '') {


        const emailCc = newTemplate.newEmailCc.trim().split(',');
        emailCc.forEach(function (part, index, theArray) {
          theArray[index] = theArray[index].trim();
        });

        emailTemplate.setEmailCc(emailCc);
      }
      this.emailHttpService.postNewTemplate(emailTemplate, this.inputSystemIdFotTemplateCreationId).subscribe(
        (response: Response) => {
          this.secondForm('green', 'New Template: ' + emailTemplate.emailTemplateName + ' created', true)
        },
        err => {

          this.secondForm('red', err.error, true)


        }
      );

    }
  }

  newTemplateInputSystemOnChange(newTemplateInputSystemOnChange) {
    this.isSelectedInputSystemForPost = true;
  }
}


