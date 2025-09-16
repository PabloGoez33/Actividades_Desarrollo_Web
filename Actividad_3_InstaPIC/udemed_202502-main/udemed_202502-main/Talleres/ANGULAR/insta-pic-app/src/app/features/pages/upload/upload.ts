import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
import { UserServices } from '../../../shared/services/user-services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {

  storageService = inject(Storage)
  authService = inject(Auth)
  userService = inject(UserServices)
  router = inject(Router)

  onUploadImage(event: Event) {

    let inputFile = event.target as HTMLInputElement;

    if (!inputFile.files || inputFile.files.length <= 0) {
      return;
    }

    const imageFile = inputFile.files[0];
    const username = this.authService.getUserLogged().username;
    this.storageService.uploadFile(imageFile, username)
      .then(response => {
        if (response && response.data) {
          const url = this.storageService.getImageUrl(response.data.fullPath);
          this.userService.saveImage(username, url);
        } else if (response) {
          Swal.fire('Error!!')
        }
      });
      this.router.navigate(['home']);
  }

}
