import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  fb = inject(FormBuilder);
  router = inject(Router);

  ruta = '';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group({
    username:['jjzapata', [Validators.required]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  })


  onSignUp(){
    if(!this.signUpForm.valid){
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.signUpForm.value;
    console.log(user);

    if(user.password !== user.rePassword){
      alert('Las contraseñas no coinciden');
      return;
    }

    if(localStorage.getItem(user.username!)){
      alert('Usuario ya existe');
      return;
    }

    localStorage.setItem(user.username!, JSON.stringify(user));
    alert('Usuario registrado exitosamente');

    this.router.navigate(['/login']);

    //let user2 = JSON.parse(JSON.stringify(user))

  }

}
