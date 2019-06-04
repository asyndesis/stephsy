import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService, UserService } from 'src/app/_services';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';
import zodiac from '../../../_tools/zodiac';
import crypto from '../../../_tools/md5';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  userList:any;

  constructor(
    private userService: UserService,
    private toastController: ToastController,
  ){}

  ngOnInit() {
    this.getUsers();
  }
  // gravatar
  getAvatar(email){
    return "https://www.gravatar.com/avatar/" + crypto.md5((email || '').toLowerCase(), false, false);
  }
  getZodiac(birthday){
    if (birthday){
      let month = birthday.substring(5,7);
      let day = birthday.substring(8,10);
      return zodiac.getSign(day,month)['symbol'];
    }
    return "☮"
  }
  getUsers() {
      this.userService
          .getUsers()
          .pipe(first())
          .subscribe(
        async data => {
          this.userList = data;
        },
        async error => {
          const toast = await this.toastController.create({
            color:'danger',
            message: error,
            duration: 5000,
            showCloseButton: true,
            closeButtonText: 'Okay!'
          });
          toast.present();
        }
      );
  }
}
