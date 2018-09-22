import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NosyHttpService} from './nosy-http.service';
import {InputSystem} from './input-system';
import {NgForm} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'app-input-system',
  templateUrl: './input-system.component.html'

})
export class InputSystemComponent implements OnInit {
  private selectedInputSystemId: string;

  private inputSystems: InputSystem[];
  private firstFormEnable: boolean;
  private postSuccessMessage: string;
  private isPostSuccess: boolean;
  private colourPostSuccessMessage: string;
  private operationsUpdateAndDelete: string;
  private isOperationsUpdateAndDelete: boolean;
  private colourOperationsUpdateAndDelete: string;
  private firstFormUpdatableInputSystem: InputSystem;

  constructor(private nosyHttpService: NosyHttpService, private cd: ChangeDetectorRef) {


  }



  ngOnInit() {

    this.nosyHttpService.getInputSystems().subscribe(
      data => {
        this.inputSystems = data;
      })
  }


  onChange(inputSystemName) {
    this.allFormReset();

    this.firstFormEnable = true;
    this.firstFormUpdatableInputSystem = inputSystemName;
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


  onClear(){
    this.firstFormEnable = false;


  }

  updateExistingSystem(updatedForm: NgForm) {
    this.allFormReset();

     updatedForm = updatedForm.value;
     if (updatedForm['updateExistingInputSystemName'] === null || updatedForm['updateExistingInputSystemName'] === '') {
      this.firstForm('red', 'System Name cannot be null or empty', true)

    } else {
      this.firstForm('', '', false)


      const inputSystem: InputSystem = <InputSystem>{
        inputSystemId: this.selectedInputSystemId,

        inputSystemName: updatedForm['updateExistingInputSystemName'],
        emailTemplate: null
      };
      this.nosyHttpService.updateExistingInputSystem(inputSystem).subscribe(
        (response: InputSystem) => {
          this.inputSystems.find(x => x.inputSystemId === response.inputSystemId).inputSystemName = response.inputSystemName;
          this.firstForm('green', 'Successfully updated input system name to' + updatedForm['updateExistingInputSystemName'], true);
          this.inputSystems = [ ... this.inputSystems ];
        },
        err => {
          this.firstForm('red', err.error, true);
        })
    }

  }

  deleteExistingSystem() {
    this.allFormReset();


    this.nosyHttpService.deleteExistingInputSystem(this.selectedInputSystemId).subscribe(
      (response: any) => {

        this.firstForm('green', 'Input System ' + this.firstFormUpdatableInputSystem.inputSystemName + ' deleted!', true)

        this.inputSystems.splice(this.inputSystems.indexOf(
        this.inputSystems.find(x => x.inputSystemId === this.selectedInputSystemId)), 1);
        this.inputSystems = [ ... this.inputSystems ];

      })
  }

  newInputSystem(inputSystemName) {
    if (inputSystemName === null || inputSystemName === '') {
      this.secondForm('red', 'System Name cannot be null or empty', true)

    } else{
    this.allFormReset();
    this.nosyHttpService.postInputSystemName(inputSystemName).subscribe(
      (response: InputSystem) => {
        this.secondForm('green', 'successfully created Input System '+ inputSystemName, true);
        this.inputSystems = [ ... this.inputSystems, response];
      }, err => {
          this.secondForm('red', err.error, true)
      }
      )
    }
  }

  allFormReset(){
    this.secondForm('', '', false);
    this.firstForm('', '', false);
  }
}


