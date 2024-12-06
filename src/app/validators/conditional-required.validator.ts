import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function conditionalRequiredValidator(dependentField:string , exceptedValue:any): ValidatorFn {

    return (control:AbstractControl):ValidationErrors | null => {
       
        debugger;
        if(!control.parent){
            return null;
        }
        const dependentControl = control.parent.get(dependentField);

        if(!dependentControl){
            return null;
        }
        debugger;
        dependentControl.clearValidators();
        dependentControl.updateValueAndValidity();
        
        
        
        if(control.value == exceptedValue && !dependentControl.value){
            dependentControl.addValidators(Validators.required);
            console.log("işem sonrası->",dependentControl.hasValidator(Validators.required));
            dependentControl.updateValueAndValidity();
            return null;//{required:true};
        }
        console.log("gelmeden->", control.parent.get(dependentField)!.hasValidator(Validators.required));
        

        return null;
    }



}