import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private authService = inject(Auth);
  router = inject(Router);

  isLogged = this.authService.isLogged;

  onLogout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
