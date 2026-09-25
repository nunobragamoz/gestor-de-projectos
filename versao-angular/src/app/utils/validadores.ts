import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validators.required aceita "   ", por isso o texto é validado sem espaços.
export function obrigatorio(controlo: AbstractControl<string>): ValidationErrors | null {
  return controlo.value.trim() ? null : { obrigatorio: true };
}
