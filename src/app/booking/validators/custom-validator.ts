import { AbstractControl, FormGroup } from '@angular/forms';


//This is control level validator 
export class CustomValidator {
  //The AbstractControl will have all the information about the formgroup, fromcontrol, formarray everything. It is the base class for everything.

  static validateName(control: AbstractControl) {
    const validate = control.value as string; // Because the value is any type we have to specify that particular variable type
    //where this validator is being used, it will be better for performance and avoid unncessary issues.
    if (validate.includes('test')) {
      return { invalidName: true };
    }
    return null;
  }

  // here why we can't able to pass abstractcontrol within the function argument. insetead why we have to retrun it as another function.
  //This is custome Vlaidator if we want to check by passing arguments.
  static validateSpecialChar(char : string){
    return (control: AbstractControl)=>{
    const value = control.value as string;
    if(value.includes(char)){
        return {
            invalidSpecialChar: true
        };
    }
    return null;
  }
}


//This is form level validator
static validatedate(control: FormGroup){
const checkinDate : any = new Date(control.get('checkinDate')?.value);
const checkoutDate : any  = new Date(control.get('checkoutDate')?.value);
const diffTime = checkoutDate - checkinDate;
const diffDays =  Math.ceil(diffTime/(1000*60*60*24));
if(diffDays<=0){
    control.get('checkoutDate')?.setErrors({
     invalidDate : true, // can we change and keep whatever the names we want instead of invalidDate.
    })
    return {
        invalidDate : true
    };
}
return null;
}
}
