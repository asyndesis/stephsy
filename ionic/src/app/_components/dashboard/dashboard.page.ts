import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService } from 'src/app/_services';
import crypto from '../../_tools/md5';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  profilePicture:string = "https://www.gravatar.com/avatar/";
  currentUser:User;
  returnUrl: string;
  constructor(
    private authenticationService: AuthenticationService,

  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.profilePicture = "https://www.gravatar.com/avatar/" + crypto.md5((this.currentUser.email || '').toLowerCase(), false, false);
  }
}
