import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpaces(control: AbstractControl): ValidationErrors | null {
  const val = String(control.value || '');
  
  return val.includes(' ') ? { noSpaces: true } : null;
}
