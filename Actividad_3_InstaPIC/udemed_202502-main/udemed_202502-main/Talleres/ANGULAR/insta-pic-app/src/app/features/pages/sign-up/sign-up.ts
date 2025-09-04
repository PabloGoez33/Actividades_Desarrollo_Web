import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import Swal from 'sweetalert2';

import { noSpaces } from '../../../shared/validators/no-space';
import { passwordMatch } from '../../../shared/validators/password-match';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  fb = inject(FormBuilder);

  router = inject(Router);

  authService = inject(Auth);

  title = 'Registro de usuario';

  ruta = "";

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group({
    username:['', [Validators.required, noSpaces, Validators.minLength(4)]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  }, {validators: passwordMatch});


  onSignUp(){
    //Validar username sin espacios
    if(this.signUpForm.get('username')?.hasError('noSpaces')){
      Swal.fire({
        icon: 'warning',
        text: 'El nombre de usuario no puede contener espacios'
      });
      return;
    }

    //Validar contraseñas iguales y campos faltantes
    if(!this.signUpForm.valid){
      const mismatch = this.signUpForm.errors?.['passwordMismatch'];
      Swal.fire({
        icon: 'warning',
        text: mismatch ? 'Las contraseñas no coinciden' : 'Faltan campos por diligenciar'
      });
      return;
    }

    let user = this.signUpForm.value as User;
    
    let signUpResponse = this.authService.signUp(user);

    if(!!signUpResponse.success){
      this.router.navigate([signUpResponse.redirectTo]);
      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: signUpResponse.message
    });

  }

}
