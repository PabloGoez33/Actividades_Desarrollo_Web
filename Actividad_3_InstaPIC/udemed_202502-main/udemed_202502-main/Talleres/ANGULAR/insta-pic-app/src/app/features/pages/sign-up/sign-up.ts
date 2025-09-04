import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import Swal from 'sweetalert2';

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
    username:['jjzapata', [Validators.required]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  })


  onSignUp(){
    if(!this.signUpForm.valid){
      Swal.fire({
        icon: 'warning',
        text: 'Faltan campos por diligenciar'
      });
      return;
    }

    let user = this.signUpForm.value as User;
    
    let signUpResponse = this.authService.signUp(user);

    if(user.password !== user.rePassword){
      Swal.fire({
        icon: 'warning',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }

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
