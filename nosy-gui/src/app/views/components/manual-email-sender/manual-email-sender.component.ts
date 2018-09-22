import {Component, OnInit, ViewChild} from '@angular/core';
import {NosyHttpService} from '../../input-system/nosy-http.service';
import {EmailHttpService} from '../email/email-http.service';
import {EmailTemplate} from '../email/email-template';
import {InputSystem} from '../../input-system/input-system';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'app-manual-email-sender',
  templateUrl: './manual-email-sender.component.html',
  styleUrls: ['./manual-email-sender.component.scss']
})
export class ManualEmailSenderComponent implements OnInit {
  private selectedEmailTemplate: EmailTemplate;
  private isSelectedEmailTemplate: boolean;
  private selectedEmailTemplateId: string;
  private isSelectedInputSystem: boolean;
  private inputSystems: InputSystem[];
  private availableProviders: [string];


  private emailTemplates: EmailTemplate[];
  private colourOperationsSend: string;
  private isOperationsSend: boolean;
  private operationsSend: string;

  private selectedInputSystemId: string;

  @ViewChild('chosenuser') public ngSelect: NgSelectComponent;

  private mailSender: FormGroup;
  constructor(private nosyHttpService: NosyHttpService, private emailHttpService: EmailHttpService) {
  }

  ngOnInit() {
    this.firstFormReset();

    this.mailSender = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null),
      'placeholders': new FormArray([])

    })
    this.nosyHttpService.getInputSystems().subscribe(
      data => {
        this.inputSystems = data;

      }
    );
    this.emailHttpService.getAllAvailableProviders().subscribe(
      data => {
        this.availableProviders = data;
      }
    );

  }


  onChangeInputSystemFirstForm() {
    if (this.selectedInputSystemId !== null) {

      this.firstFormReset();
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
    this.firstFormReset();
    this.selectedEmailTemplate = selectedEmailTemplate;
    this.isSelectedEmailTemplate = true;

  }


  onClearInputSystem() {
    this.isSelectedEmailTemplate = false;

    this.isSelectedInputSystem = false;

  }

  onClearEmailTemplate() {
    this.isSelectedEmailTemplate = false;

  }

  firstForm(colour, message, isEnabled) {
    this.colourOperationsSend = colour;
    this.isOperationsSend = isEnabled;
    this.operationsSend = message;
  }


  firstFormReset() {
    this.firstForm('', '', false);

  }

  sendEmail() {
    this.firstFormReset();

    this.emailHttpService.postEmail(this.selectedEmailTemplateId,
      this.selectedInputSystemId, this.mailSender.value).subscribe(
      data => {
        this.firstForm('green',
          'Successfully Sent Email', true)
      },
      err => {
        this.firstForm('red', err.error, true)
      }
    );

  }

  addPlaceHolder() {
    this.firstFormReset();

    (<FormArray>this.mailSender.get('placeholders')).push(
      new FormGroup({
        'name': new FormControl(null),
        'value': new FormControl(null)
      })
    );

  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.mailSender.get('placeholders')).removeAt(-1)
  }
}
