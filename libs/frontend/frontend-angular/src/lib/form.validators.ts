import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable()
export class FormValidators
{
    validatorLength(numberOfCharsMin: number, numberOfCharsMax: number): ValidatorFn {
        const regexp = new RegExp(`^[A-Za-z0-9@#$%^&+=]{${numberOfCharsMin},${numberOfCharsMax}}$`);
    
        return (control: AbstractControl): ValidationErrors | null => {
          const test = regexp.test(control.value);
          return test ? null : { length: { value: control.value } };
        };
    }

    validatorEmail(): ValidatorFn {
        const regexp = new RegExp(
          '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
        );
    
        return (control: AbstractControl): ValidationErrors | null => {
          const test = regexp.test(control.value);
          return test ? null : { email: { value: control.value } };
        };
    }

    validatorAtleastOneNumber(): ValidatorFn {
        const regexp = new RegExp('.*[0-9].*');
    
        return (control: AbstractControl): ValidationErrors | null => {
          const test = regexp.test(control.value);
          return test ? null : { atleastOneNumber: { value: control.value } };
        };
    }

    validatorAtleastOneUppercase(): ValidatorFn {
        const regexp = new RegExp('.*[A-Z].*');
    
        return (control: AbstractControl): ValidationErrors | null => {
          const test = regexp.test(control.value);
          return test ? null : { atleastOneUppercase: { value: control.value } };
        };
    }

    validatorAtleastOneSpecial(): ValidatorFn {
        const regexp = new RegExp('.*[@#$%^&+=].*');
    
        return (control: AbstractControl): ValidationErrors | null => {
          const test = regexp.test(control.value);
          return test ? null : { atleastOneSpecial: { value: control.value } };
        };
    }
}