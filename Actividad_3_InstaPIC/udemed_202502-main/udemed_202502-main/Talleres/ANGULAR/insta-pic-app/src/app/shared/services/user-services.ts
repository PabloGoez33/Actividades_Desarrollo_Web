import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserServices {

  private user = signal<User | null>(null);

  saveImage(username: string, url: string) {
    let userString = localStorage.getItem(username);
    if (userString) {
      let user = JSON.parse(userString);
      user.gallery.push(url);
      console.log(user);
      localStorage.setItem(username, JSON.stringify(user));
    }
  }

  getUser(username: string) {
    let userString = localStorage.getItem(username);
    if (userString) {
      return JSON.parse(userString);
    } else {
      return;
    }
  }
}
