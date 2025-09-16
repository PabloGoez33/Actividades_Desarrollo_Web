import { Component, signal, inject, OnInit } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserServices } from '../../../shared/services/user-services';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  authService = inject(Auth);
  userService = inject(UserServices);

  followers = 48;
  requests = 37;
  username = this.authService.getUserLogged().username;
  galleryItems = signal([]);

  ngOnInit(): void {
    const user = this.userService.getUser(this.username);

    if (user) {
      this.galleryItems.set(user.gallery);
    }
  }

  
}