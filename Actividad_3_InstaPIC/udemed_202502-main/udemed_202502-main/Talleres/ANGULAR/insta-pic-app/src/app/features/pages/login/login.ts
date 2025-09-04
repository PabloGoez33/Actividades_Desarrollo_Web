import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  fb = inject(FormBuilder);

  router = inject(Router);

  authService = inject(Auth);

  title = 'Inicio de sesión';

  ruta = "";

  validators = [Validators.required, Validators.minLength(4)];

  signInForm = this.fb.group({
    username:['', [Validators.required]],
    password:['', this.validators]
  })


  onSignIn(){
    if(!this.signInForm.valid){
      Swal.fire({
        icon: 'warning',
        text: 'Faltan campos por diligenciar'
      });
      return;
    }

    let user = this.signInForm.value as User;
    
    let loginResponse = this.authService.login(user);

    if(!!loginResponse.success){
      Swal.fire({
        icon: 'success',
        title: 'Login exitoso'
      });
      this.router.navigate([loginResponse.redirectTo]);
      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario o contraseña incorrecta'
    });
  }
}
