import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  login(user: User): LoginResponse{

    let userStr = localStorage.getItem(user.username!);

    if(userStr && user.password === JSON.parse(userStr)['password']){
      return {success: true, redirectTo: 'home'};
    }

    return {success: false};
  }


  signUp(user: User): SignUpResponse{

    if(localStorage.getItem(user.username)){
      return {success: false, message: 'El usuario ya existe'};
    }

    localStorage.setItem(user.username, JSON.stringify(user));
    return {success: true, redirectTo: 'home'};

  }


  private getUser(username: string){
    
  }
}