import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatch(FormGroup: AbstractControl): ValidationErrors | null {
  const pass = FormGroup.get('password')?.value;
  const rep  = FormGroup.get('rePassword')?.value;
  if (pass && rep && pass !== rep) return { passwordMismatch: true };
  return null;
}
