import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserServices } from '../../../shared/services/user-services';
import { Notification } from '../../../shared/services/notification';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  authService = inject(Auth);
  userService = inject(UserServices);
  notification = inject(Notification);

  private sub?: Subscription;

  followers = 48;
  requests = 37;
  username = this.authService.getUserLogged().username;
  galleryItems = signal<string[]>([]);

  ngOnInit(): void {
    const user = this.userService.getUser(this.username);

    if (user) {
      this.galleryItems.set(user.gallery);
    }

    this.sub = this.notification.notify$.subscribe(notif  => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: notif.type,
        title: notif.type === 'success' ? '¡Exitos!' : 'Error',
        text: notif.message,
        timer: 2000,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInRight
            animate__faster
            `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutRight
            animate__faster
            `
        },
        showConfirmButton: false
      });

      const url = notif.payload?.imageUrl;
      if (notif.type === 'success' && url) {
        this.galleryItems.update(items => {
          if ( items.includes(url) ) return items;
          return [url, ...items];
        });
      }

      this.notification.clear();
    });
  }

  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }

  
}