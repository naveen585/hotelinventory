import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailvalidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailvalidatorDirective,
    multi:true
  }]
})
export class EmailvalidatorDirective implements Validator {

  constructor() { }

  //The abstractcontrol is the base class where we can implement the required validations irrespective of both template driven forms
  //or recative forms.
  //ValidationErrors whcih will retrun the error or null vaue it is like a key value pair.


  //This is a custom validation component which can be used everywhere in the application. It is reusable as well.
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if(value.includes('test')){
      return {
        invalidEmail: true
      }
    }
    return null;  
  }

}
